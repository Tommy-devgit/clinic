export function adminGuard(role: string) {
  return role === "admin";
}
