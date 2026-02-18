"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
  type AppointmentPayload,
  type AppointmentUpdatePayload,
} from "@/services/appointments";

export function useAppointments() {
  return useQuery({ queryKey: ["appointments"], queryFn: getAppointments });
}

export function useAppointment(id: string) {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById(id),
    enabled: Boolean(id),
  });
}

export function useAppointmentMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: AppointmentPayload) => createAppointment(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AppointmentUpdatePayload }) => updateAppointment(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointments", variables.id] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAppointment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  return { create, update, remove };
}
