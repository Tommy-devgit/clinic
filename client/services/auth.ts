import type { User } from "@/types/user";
import { apiClient, setAccessToken } from "./apiClient";

export async function login(payload: { email: string; password: string }) {
  const response = await apiClient.post<{ accessToken: string; user: User }>("/auth/login", payload);
  setAccessToken(response.data.accessToken);
  return response.data;
}

export async function register(payload: { name: string; email: string; password: string }) {
  const response = await apiClient.post<User>("/auth/register", payload);
  return response.data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
  setAccessToken(null);
}

export async function refreshSession() {
  const response = await apiClient.post<{ accessToken: string }>("/auth/refresh");
  setAccessToken(response.data.accessToken);
  return response.data;
}

export async function getMe() {
  const response = await apiClient.get<User>("/auth/me");
  return response.data;
}