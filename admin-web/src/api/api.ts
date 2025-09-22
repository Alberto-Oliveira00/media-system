import { message } from "antd";
import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { clearAuth, getAuthState, setAuthTokens } from "../stores/useAuthHelpers";
import { refreshTokenApi } from "./authService";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5023/api";

const api = axios.create({ baseURL });


api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = getAuthState();
  const token = auth?.token;
  if (token && config && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    // If 401 and we haven't retried yet -> try refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const auth = getAuthState();
        const refresh = auth?.refreshToken;
        if (!refresh) throw new Error("No refresh token");

        // call refresh endpoint with plain axios (no interceptors)
        const { data } = await refreshTokenApi({ acessToken: auth.token ?? "", refreshToken: refresh });

        // update tokens in store and localStorage
        setAuthTokens(data.acessToken ?? data.acess_token ?? data.token ?? data, data.refreshToken ?? data.refresh_token ?? data.refreshToken);

        // retry original request
        if (originalRequest && originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${getAuthState()?.token}`;
        }
        return api(originalRequest);
      } catch (refreshErr) {
        // refresh failed -> logout
        clearAuth();
        message.error("Sessão expirada. Faça login novamente.");
        // optional: redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    // Other errors: show message if available
    const respData = (error.response && (error.response.data as any)) ?? {};
    const errMsg = respData?.message ?? respData?.error ?? error.message;
    if (errMsg) message.error(errMsg);
    return Promise.reject(error);
  }
);

export default api;