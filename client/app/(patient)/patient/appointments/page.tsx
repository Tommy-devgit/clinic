"use client";

import Link from "next/link";
import { formatAppointmentDate } from "@/lib/date";
import { useAppointmentMutations, useAppointments } from "@/hooks/useAppointments";

export default function PatientAppointmentsPage() {
  const { data, isLoading, isError } = useAppointments();
  const { update } = useAppointmentMutations();

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading appointments...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Unable to load appointments right now.</p>;
  }

  if (!data?.length) {
    return <p className="text-sm text-slate-600">No appointments found.</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">My Appointments</h1>
      <div className="space-y-3">
        {data.map((appointment) => {
          const doctorName = typeof appointment.doctor === "string" ? appointment.doctor : appointment.doctor.name;

          return (
            <article key={appointment._id} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-900">{doctorName}</p>
              <p className="text-sm text-slate-600">{formatAppointmentDate(new Date(appointment.date))}</p>
              <p className="mt-1 text-sm capitalize text-slate-700">Status: {appointment.status}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/patient/appointments/${appointment._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">
                  View details
                </Link>
                {appointment.status !== "cancelled" ? (
                  <button
                    className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                    onClick={() => update.mutate({ id: appointment._id, payload: { status: "cancelled" } })}
                  >
                    Cancel appointment
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
