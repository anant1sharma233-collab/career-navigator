import axios, { AxiosError, type AxiosInstance } from "axios";

const baseURL = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (r) => r,
  (error: AxiosError<{ error?: string }>) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      const path = window.location.pathname;
      if (!path.startsWith("/login") && !path.startsWith("/register")) {
        window.location.replace("/login");
      }
    }
    const message =
      error.response?.data?.error ??
      (error.code === "ECONNABORTED" ? "Request timed out" : "Something went wrong");
    return Promise.reject(new Error(message));
  },
);
