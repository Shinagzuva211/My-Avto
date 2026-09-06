import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import type { User } from "./auth-context";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function AuthProvider({ children } : { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("admin_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));

  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const newToken = btoa(`${email}:${password}`);
      const newUser = { id: "1", email, role: "admin" };
      localStorage.setItem("admin_token", newToken);
      localStorage.setItem("admin_user", JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      return;
    }
    throw new Error("Invalid email or password");
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading: false }}>
     {children}
    </AuthContext.Provider>
  );
}