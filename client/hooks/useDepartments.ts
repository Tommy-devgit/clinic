"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
  type DepartmentPayload,
} from "@/services/departments";

export function useDepartments() {
  return useQuery({ queryKey: ["departments"], queryFn: getDepartments });
}

export function useDepartment(id: string) {
  return useQuery({ queryKey: ["departments", id], queryFn: () => getDepartmentById(id), enabled: Boolean(id) });
}

export function useDepartmentMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: DepartmentPayload) => createDepartment(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<DepartmentPayload> }) => updateDepartment(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["departments", variables.id] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  return { create, update, remove };
}
