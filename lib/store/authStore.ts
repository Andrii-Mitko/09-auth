import { create } from "zustand";
import type { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  // Встановлення користувача одразу синхронізує стан авторизації
  setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
  clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
}));
