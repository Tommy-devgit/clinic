"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { usePatient } from "@/hooks/usePatient";

export default function PatientDashboardPage() {
  const { data: profile, isLoading: profileLoading } = usePatient();
  const { data: appointments, isLoading: appointmentsLoading } = useAppointments();

  if (profileLoading || appointmentsLoading) {
    return <p className="text-sm text-slate-600">Loading dashboard...</p>;
  }

  const upcoming = appointments?.filter((item) => item.status !== "cancelled").length ?? 0;
  const confirmed = appointments?.filter((item) => item.status === "confirmed").length ?? 0;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {profile?.name ?? "Patient"}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Upcoming Appointments</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{upcoming}</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Confirmed Visits</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{confirmed}</p>
        </article>
      </div>
    </section>
  );
}
