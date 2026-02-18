import { Sidebar } from "@/components/navigation/Sidebar";

export function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
      <Sidebar items={["Dashboard", "Appointments", "Profile"]} title="Patient Portal" />
      <main>{children}</main>
    </div>
  );
}
