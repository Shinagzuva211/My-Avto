import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import type { User } from "./auth-context";
import { ADMIN_API_URL } from "../utils/api";

// Faqat ekranda ko'rsatish uchun foydalanuvchi ma'lumoti. Parol yoki token SAQLANMAYDI.
const USER_CACHE_KEY = "admin_user";

function readCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    localStorage.removeItem(USER_CACHE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readCachedUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const applyUser = (next: User | null) => {
      if (!active) return;
      setUser(next);
      if (next) localStorage.setItem(USER_CACHE_KEY, JSON.stringify(next));
      else localStorage.removeItem(USER_CACHE_KEY);
    };

    fetch(`${ADMIN_API_URL}/me`, { credentials: "include" })
      .then(async (res) => (res.ok ? ((await res.json()) as { user: User }).user : null))
      .then(applyUser)
      .catch(() => applyUser(null))
      .finally(() => {
        if (active) setLoading(false);
      });

    const onSessionExpired = () => applyUser(null);
    window.addEventListener("admin-session-expired", onSessionExpired);
    return () => {
      active = false;
      window.removeEventListener("admin-session-expired", onSessionExpired);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${ADMIN_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = (await res.json().catch(() => ({}))) as { user?: User; error?: string };
    if (!res.ok) throw new Error(data.error || "Invalid email or password");
    const next = data.user ?? { id: "1", email, role: "admin" };
    setUser(next);
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(next));
  };

  const logout = async () => {
    try {
      await fetch(`${ADMIN_API_URL}/logout`, { method: "POST", credentials: "include" });
    } finally {
      setUser(null);
      localStorage.removeItem(USER_CACHE_KEY);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}
