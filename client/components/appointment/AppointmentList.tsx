"use client";

import { AppointmentCard } from "./AppointmentCard";
import { useAppointments } from "@/hooks/useAppointments";

export function AppointmentList() {
  const { data, isLoading, isError } = useAppointments();

  if (isLoading) {
    return <p className="text-slate-600">Loading appointments...</p>;
  }

  if (isError) {
    return <p className="text-red-600">Unable to load appointments right now.</p>;
  }

  if (!data?.length) {
    return <p className="text-slate-600">No appointments found.</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Appointments</h1>
      <div className="grid gap-4">
        {data.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </section>
  );
}