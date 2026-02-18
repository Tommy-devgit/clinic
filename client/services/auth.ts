import { apiClient, setAccessToken } from "./apiClient";

export async function login(payload: { email: string; password: string }) {
  const response = await apiClient.post("/auth/login", payload);
  setAccessToken(response.data.accessToken);
  return response.data;
}

export async function register(payload: { name: string; email: string; password: string }) {
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
  setAccessToken(null);
}
