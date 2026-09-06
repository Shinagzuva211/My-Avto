import { createContext } from "react";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export interface UserAuthContextType {
  user: SessionUser | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);