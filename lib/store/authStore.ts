import { create } from "zustand";
import { User } from "@/types/user";

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
  setUser: (user) => set({ user }),

  clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
}));
