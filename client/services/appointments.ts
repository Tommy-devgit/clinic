import type { Appointment } from "@/types/appointment";
import { apiClient } from "./apiClient";

export type AppointmentPayload = {
  doctor: string;
  date: string;
  notes?: string;
};

export type AppointmentUpdatePayload = {
  doctor?: string;
  date?: string;
  notes?: string;
  status?: "pending" | "confirmed" | "cancelled";
};

export async function getAppointments() {
  const response = await apiClient.get<Appointment[]>("/appointments");
  return response.data;
}

export async function getAppointmentById(id: string) {
  const response = await apiClient.get<Appointment>(`/appointments/${id}`);
  return response.data;
}

export async function createAppointment(payload: AppointmentPayload) {
  const response = await apiClient.post<Appointment>("/appointments", payload);
  return response.data;
}

export async function updateAppointment(id: string, payload: AppointmentUpdatePayload) {
  const response = await apiClient.patch<Appointment>(`/appointments/${id}`, payload);
  return response.data;
}

export async function deleteAppointment(id: string) {
  await apiClient.delete(`/appointments/${id}`);
}
