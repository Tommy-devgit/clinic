"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "@/services/admin";

export function useAdminStats() {
  return useQuery({ queryKey: ["admin", "stats"], queryFn: getAdminStats });
}
