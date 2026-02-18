export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
