"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoctor, deleteDoctor, getDoctorById, getDoctors, updateDoctor, type DoctorPayload } from "@/services/doctors";

export function useDoctors() {
  return useQuery({ queryKey: ["doctors"], queryFn: getDoctors });
}

export function useDoctor(id: string) {
  return useQuery({ queryKey: ["doctors", id], queryFn: () => getDoctorById(id), enabled: Boolean(id) });
}

export function useDoctorMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: DoctorPayload) => createDoctor(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<DoctorPayload> }) => updateDoctor(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctors", variables.id] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteDoctor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });

  return { create, update, remove };
}
