import { createContext } from "react";

export type User = {
  username: string;
  email: string;
  access_token: string;
  firstname: string;
  lastname: string;
};

type AuthContext = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);
