import { useAuthStore } from "./useAuthStore";

export const getAuthState = () => {
  const s = (useAuthStore as any).getState ? (useAuthStore as any).getState() : null;
  return s ? { token: s.token, refreshToken: s.refreshToken } : null;
};

export const setAuthTokens = (token: string | null, refresh: string | null) => {
  (useAuthStore as any).setState({ token, refreshToken: refresh });
  if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
  if (refresh) localStorage.setItem("refreshToken", refresh); else localStorage.removeItem("refreshToken");
};

export const clearAuth = () => {
  (useAuthStore as any).setState({ token: null, refreshToken: null });
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
