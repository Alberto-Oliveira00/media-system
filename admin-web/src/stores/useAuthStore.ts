import { create } from "zustand";
import * as authService from "../api/authService";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (userName: string, password: string) => Promise<boolean>;
  register: (payload: { userName: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  setTokens: (token: string | null, refresh: string | null) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  loading: false,

  login: async (userName, password) => {
    set({ loading: true });
    try {
      const res = await authService.login({ userName, password });
      // API returns Token, RefreshToken, Expiration etc.
      const token = res?.Token ?? res?.token ?? res?.accessToken ?? res?.acessToken;
      const refresh = res?.RefreshToken ?? res?.refreshToken;
      localStorage.setItem("token", token);
      if (refresh) localStorage.setItem("refreshToken", refresh);
      set({ token, refreshToken: refresh, loading: false });
      return true;
    } catch (err) {
      set({ loading: false });
      return false;
    }
  },

  register: async (payload) => {
    set({ loading: true });
    try {
      await authService.register(payload);
      set({ loading: false });
      return true;
    } catch (err) {
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({ token: null, refreshToken: null });
  },

  setTokens: (token, refresh) => {
    if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
    if (refresh) localStorage.setItem("refreshToken", refresh); else localStorage.removeItem("refreshToken");
    set({ token, refreshToken: refresh });
  },
}));
