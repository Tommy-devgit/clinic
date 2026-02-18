import type { Doctor } from "./doctor";
import type { User } from "./user";

export interface Appointment {
  _id: string;
  doctor: Doctor | string;
  patient: Pick<User, "id" | "name" | "email" | "role"> | string;
  date: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}
