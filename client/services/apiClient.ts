import axios from "axios";

type RetryConfig = {
  _retry?: boolean;
};

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig & typeof error.config;

    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await apiClient.post("/auth/refresh");
        const newAccessToken = refreshResponse.data.accessToken as string;
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch {
        setAccessToken(null);
      }
    }

    return Promise.reject(error);
  },
);
