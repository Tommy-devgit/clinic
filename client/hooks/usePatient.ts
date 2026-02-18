import { useQuery } from "@tanstack/react-query";
import { getPatientProfile } from "@/services/patients";

export function usePatient() {
  return useQuery({ queryKey: ["patient"], queryFn: getPatientProfile });
}
