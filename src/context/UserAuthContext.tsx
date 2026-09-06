import { useState, type ReactNode } from "react";
import { UserAuthContext } from "./user-auth-context";
import type { SessionUser } from "./user-auth-context";

const SESSION_KEY = "hodiy_user_session";

const API_URL = (import.meta.env.VITE_AUTH_API_URL || "http://localhost:3001").replace(/\/$/, "");

async function apiRequest(path: string, body: unknown): Promise<Response> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res;
}

function mapError(status: number, message: string): string {
  if (status === 401 || message.toLowerCase().includes("invalid credentials")) {
    return "invalidCredentials";
  }
  if (message.toLowerCase().includes("already exists")) {
    return "accountExists";
  }
  if (status === 400 && message.toLowerCase().includes("password")) {
    return "passwordMismatch";
  }
  return "unknownError";
}

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });

  const register = async (name: string, email: string, password: string) => {
    let res: Response;
    try {
      res = await apiRequest("/api/users/register", { name, email, password });
    } catch {
      throw new Error("networkError");
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "" }));
      throw new Error(mapError(res.status, data.error || ""));
    }

    const created = await res.json();
    const sessionUser: SessionUser = { id: created.id, name: created.name, email: created.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const login = async (email: string, password: string) => {
    let res: Response;
    try {
      res = await apiRequest("/api/users/login", { email, password });
    } catch {
      throw new Error("networkError");
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "" }));
      throw new Error(mapError(res.status, data.error || ""));
    }

    const data = await res.json();
    const sessionUser: SessionUser = { id: data.user.id, name: data.user.name, email: data.user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}
