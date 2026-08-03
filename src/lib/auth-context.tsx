"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback, // 👈 নতুন import
  useMemo,     // 👈 নতুন import
  ReactNode,
} from "react";
import { User } from "@/lib/types";
import { getMe } from "../service/getMe";
import { logout as logoutService } from "../service/logout";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const result = await getMe();

      if (result.success) {
        setUser(result.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
  }, []);

  
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      logout,
      setUser,
      refetchUser: fetchCurrentUser,
    }),
    [user, loading, logout, fetchCurrentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}