import { apiClient } from "./apiClient";
import type { User } from "@/types";

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const { data } = await apiClient.post<User>("/auth/login", { email, password });
    return data;
  },
  async register(payload: { name: string; email: string; password: string }): Promise<User> {
    const { data } = await apiClient.post<User>("/auth/register", payload);
    return data;
  },
  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },
  async verify(): Promise<User> {
    const { data } = await apiClient.get<User>("/auth/verify");
    return data;
  },
};
