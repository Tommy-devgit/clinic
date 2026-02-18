import { apiClient } from "./apiClient";

export async function getAdminStats() {
  const response = await apiClient.get("/admin/stats");
  return response.data;
}
