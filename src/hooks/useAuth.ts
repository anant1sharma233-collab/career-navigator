import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.logout);

  const login = useCallback(
    async ({ email }: LoginPayload) => {
      await new Promise((r) => setTimeout(r, 500));
      setUser({ id: "local", name: email.split("@")[0] ?? "Student", email } as never);
    },
    [setUser],
  );

  const logout = useCallback(async () => clear(), [clear]);

  return { user, isAuthenticated, login, logout };
}
