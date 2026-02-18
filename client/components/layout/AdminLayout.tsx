import { Sidebar } from "@/components/navigation/Sidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
      <Sidebar items={["Dashboard", "Departments", "Doctors", "Appointments", "Blog", "Settings"]} title="Admin Panel" />
      <main>{children}</main>
    </div>
  );
}
