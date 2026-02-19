"use client";

import Link from "next/link";
import { useState } from "react";
import { formatAppointmentDate } from "@/lib/date";
import { useAppointmentMutations, useAppointments } from "@/hooks/useAppointments";

export default function AdminAppointmentsPage() {
  const { data, isLoading, isError } = useAppointments();
  const { update, remove } = useAppointmentMutations();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: "confirmed" | "cancelled") {
    try {
      setBusyId(id);
      setError(null);
      setMessage(null);
      await update.mutateAsync({ id, payload: { status } });
      setMessage(`Appointment ${status}.`);
    } catch {
      setError("Unable to update appointment status.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    try {
      setBusyId(id);
      setError(null);
      setMessage(null);
      await remove.mutateAsync(id);
      setMessage("Appointment deleted.");
    } catch {
      setError("Unable to delete appointment.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Appointment Management</h1>
      {isLoading ? <p className="text-sm text-slate-600">Loading appointments...</p> : null}
      {isError ? <p className="text-sm text-red-600">Failed to load appointments.</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="space-y-3">
        {data?.map((appointment) => {
          const doctorName = typeof appointment.doctor === "string" ? appointment.doctor : appointment.doctor.name;
          const patientName = typeof appointment.patient === "string" ? appointment.patient : appointment.patient.name;
          const isBusy = busyId === appointment._id;

          return (
            <div key={appointment._id} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-medium">
                {patientName} with {doctorName}
              </p>
              <p className="text-sm text-slate-600">{formatAppointmentDate(new Date(appointment.date))}</p>
              <p className="mt-1 text-sm capitalize text-slate-700">Status: {appointment.status}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/admin/appointments/${appointment._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">
                  Edit
                </Link>
                <button
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-60"
                  disabled={isBusy || appointment.status === "confirmed"}
                  onClick={() => handleStatusChange(appointment._id, "confirmed")}
                >
                  {isBusy ? "Saving..." : "Confirm"}
                </button>
                <button
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-60"
                  disabled={isBusy || appointment.status === "cancelled"}
                  onClick={() => handleStatusChange(appointment._id, "cancelled")}
                >
                  {isBusy ? "Saving..." : "Cancel"}
                </button>
                <button
                  className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 disabled:opacity-60"
                  disabled={isBusy}
                  onClick={() => handleDelete(appointment._id)}
                >
                  {isBusy ? "Working..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
