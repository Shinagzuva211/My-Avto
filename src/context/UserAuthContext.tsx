import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserAuthContextType {
  user: Omit<UserAccount, "password"> | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const USERS_KEY = "hodiy_users";
const SESSION_KEY = "hodiy_user_session";

function getStoredUsers(): UserAccount[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<UserAccount, "password"> | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("accountExists");
    }
    const newUser: UserAccount = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const login = async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      throw new Error("invalidCredentials");
    }
    const sessionUser = { id: found.id, name: found.name, email: found.email };
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

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within UserAuthProvider");
  return ctx;
}
