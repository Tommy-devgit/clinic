import { PatientLayout } from "@/components/layout/PatientLayout";

export default function PatientRouteLayout({ children }: { children: React.ReactNode }) {
  return <PatientLayout>{children}</PatientLayout>;
}
