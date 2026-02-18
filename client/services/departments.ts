import type { Department } from "@/types/department";
import { apiClient } from "./apiClient";

export type DepartmentPayload = Pick<Department, "name" | "description">;

export async function getDepartments() {
  const response = await apiClient.get<Department[]>("/departments");
  return response.data;
}

export async function getDepartmentById(id: string) {
  const response = await apiClient.get<Department>(`/departments/${id}`);
  return response.data;
}

export async function createDepartment(payload: DepartmentPayload) {
  const response = await apiClient.post<Department>("/departments", payload);
  return response.data;
}

export async function updateDepartment(id: string, payload: Partial<DepartmentPayload>) {
  const response = await apiClient.patch<Department>(`/departments/${id}`, payload);
  return response.data;
}

export async function deleteDepartment(id: string) {
  await apiClient.delete(`/departments/${id}`);
}
