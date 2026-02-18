"use client";

import { useDoctor } from "@/hooks/useDoctors";

export default function DoctorDetailsPage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useDoctor(params.id);

  if (isLoading) {
    return <p className="text-slate-600">Loading doctor profile...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Doctor not found.</p>;
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-slate-700"><span className="font-semibold">Specialty:</span> {data.specialty}</p>
      {data.bio ? <p className="text-slate-700">{data.bio}</p> : null}
    </section>
  );
}