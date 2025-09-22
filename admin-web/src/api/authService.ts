import axios from "axios";
import api from "./api";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5023/api";

export type LoginPayload = { userName: string; password: string };
export type RegisterPayload = { userName: string; email: string; password: string };

export async function login(data: LoginPayload) {
    const res = await api.post("/auth/login", data);
    return res.data;
}

export async function register(data: RegisterPayload) {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export const refreshToken = async (payload: { acessToken: string; refreshToken: string }) => {
  const { data } = await api.post("/auth/refresh-token", payload);
  return data;
};

export async function refreshTokenApi(payload: { acessToken: string; refreshToken: string }) {
  return axios.post(`${baseURL}/auth/refresh-token`, payload);
}