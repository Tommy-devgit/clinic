"use client";

import { useAdminStats } from "@/hooks/useAdmin";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminStats();

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading dashboard stats...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Unable to load admin stats.</p>;
  }

  const cards = [
    { label: "Users", value: data.users },
    { label: "Doctors", value: data.doctors },
    { label: "Departments", value: data.departments },
    { label: "Appointments", value: data.appointments },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
