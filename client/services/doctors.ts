import type { Doctor } from "@/types/doctor";
import { apiClient } from "./apiClient";

export type DoctorPayload = Pick<Doctor, "name" | "specialty" | "bio" | "imageUrl"> & {
  department?: string;
};

export async function getDoctors() {
  const response = await apiClient.get<Doctor[]>("/doctors");
  return response.data;
}

export async function getDoctorById(id: string) {
  const response = await apiClient.get<Doctor>(`/doctors/${id}`);
  return response.data;
}

export async function createDoctor(payload: DoctorPayload) {
  const response = await apiClient.post<Doctor>("/doctors", payload);
  return response.data;
}

export async function updateDoctor(id: string, payload: Partial<DoctorPayload>) {
  const response = await apiClient.patch<Doctor>(`/doctors/${id}`, payload);
  return response.data;
}

export async function deleteDoctor(id: string) {
  await apiClient.delete(`/doctors/${id}`);
}
