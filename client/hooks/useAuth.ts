import { useMutation } from "@tanstack/react-query";
import * as authService from "@/services/auth";

export function useAuth() {
  const login = useMutation({ mutationFn: authService.login });
  const register = useMutation({ mutationFn: authService.register });
  const logout = useMutation({ mutationFn: authService.logout });

  return { login, register, logout };
}
