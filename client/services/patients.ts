import { apiClient } from "./apiClient";

export async function getPatientProfile() {
  const response = await apiClient.get("/patients/profile");
  return response.data;
}
