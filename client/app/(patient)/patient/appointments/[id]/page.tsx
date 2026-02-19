"use client";

import { use } from "react";
import { formatAppointmentDate } from "@/lib/date";
import { useAppointment } from "@/hooks/useAppointments";

export default function PatientAppointmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useAppointment(id);

  if (isLoading) {
    return <p className="text-slate-600">Loading appointment...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Appointment not found.</p>;
  }

  const doctorName = typeof data.doctor === "string" ? data.doctor : data.doctor.name;

  return (
    <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
      <h1 className="text-2xl font-semibold">Appointment Details</h1>
      <p><span className="font-medium">Doctor:</span> {doctorName}</p>
      <p><span className="font-medium">Date:</span> {formatAppointmentDate(new Date(data.date))}</p>
      <p><span className="font-medium">Status:</span> <span className="capitalize">{data.status}</span></p>
      {data.notes ? <p><span className="font-medium">Notes:</span> {data.notes}</p> : null}
    </section>
  );
}
