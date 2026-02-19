"use client";

import { use, useState } from "react";
import { useAppointment, useAppointmentMutations } from "@/hooks/useAppointments";
import { useDoctors } from "@/hooks/useDoctors";

export default function AdminAppointmentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useAppointment(id);
  const { data: doctors } = useDoctors();
  const { update } = useAppointmentMutations();

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"" | "pending" | "confirmed" | "cancelled">("");
  const [notes, setNotes] = useState("");

  if (isLoading) {
    return <p className="text-slate-600">Loading appointment...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Appointment not found.</p>;
  }

  const initialDoctor = doctor || (typeof data.doctor === "string" ? data.doctor : data.doctor._id);
  const initialDate = date || new Date(data.date).toISOString().slice(0, 16);
  const initialStatus = (status || data.status) as "pending" | "confirmed" | "cancelled";
  const initialNotes = notes || data.notes || "";

  return (
    <form
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await update.mutateAsync({ id, payload: { doctor: initialDoctor, date: new Date(initialDate).toISOString(), status: initialStatus, notes: initialNotes } });
      }}
    >
      <h1 className="text-2xl font-semibold">Edit Appointment</h1>

      <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialDoctor} onChange={(event) => setDoctor(event.target.value)}>
        {doctors?.map((item) => <option key={item._id} value={item._id}>{item.name} - {item.specialty}</option>)}
      </select>

      <input type="datetime-local" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialDate} onChange={(event) => setDate(event.target.value)} />

      <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialStatus} onChange={(event) => setStatus(event.target.value as "pending" | "confirmed" | "cancelled")}>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={4} value={initialNotes} onChange={(event) => setNotes(event.target.value)} />

      <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={update.isPending}>{update.isPending ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
