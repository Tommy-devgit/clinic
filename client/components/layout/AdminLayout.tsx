"use client";

import Link from "next/link";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useAuthContext } from "@/context/AuthContext";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { initialized, user } = useAuthContext();
  const items = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Departments", href: "/admin/departments" },
    { label: "Doctors", href: "/admin/doctors" },
    { label: "Appointments", href: "/admin/appointments" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Settings", href: "/admin/settings" },
  ];

  if (!initialized) {
    return <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600">Checking session...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-sm text-slate-700">Please sign in to access the admin panel.</p>
        <Link href="/login" className="mt-3 inline-block rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          Go to Login
        </Link>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-sm text-red-700">You do not have admin access.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
      <Sidebar items={items} title="Admin Panel" />
      <main>{children}</main>
    </div>
  );
}
