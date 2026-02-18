"use client";

import Link from "next/link";
import { formatAppointmentDate } from "@/lib/date";
import { useAppointmentMutations, useAppointments } from "@/hooks/useAppointments";

export default function AdminAppointmentsPage() {
  const { data, isLoading, isError } = useAppointments();
  const { update, remove } = useAppointmentMutations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Appointment Management</h1>
      {isLoading ? <p className="text-sm text-slate-600">Loading appointments...</p> : null}
      {isError ? <p className="text-sm text-red-600">Failed to load appointments.</p> : null}
      <div className="space-y-3">
        {data?.map((appointment) => {
          const doctorName = typeof appointment.doctor === "string" ? appointment.doctor : appointment.doctor.name;
          const patientName = typeof appointment.patient === "string" ? appointment.patient : appointment.patient.name;
          return (
            <div key={appointment._id} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-medium">{patientName} with {doctorName}</p>
              <p className="text-sm text-slate-600">{formatAppointmentDate(new Date(appointment.date))}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/admin/appointments/${appointment._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">Edit</Link>
                <button className="rounded-md border border-slate-300 px-3 py-1.5 text-sm" onClick={() => update.mutate({ id: appointment._id, payload: { status: "confirmed" } })}>Confirm</button>
                <button className="rounded-md border border-slate-300 px-3 py-1.5 text-sm" onClick={() => update.mutate({ id: appointment._id, payload: { status: "cancelled" } })}>Cancel</button>
                <button className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700" onClick={() => remove.mutate(appointment._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}