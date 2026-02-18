"use client";

import { DoctorCard } from "./DoctorCard";
import { useDoctors } from "@/hooks/useDoctors";

export function DoctorList() {
  const { data, isLoading, isError } = useDoctors();

  if (isLoading) {
    return <p className="text-slate-600">Loading doctors...</p>;
  }

  if (isError) {
    return <p className="text-red-600">Unable to load doctors right now.</p>;
  }

  if (!data?.length) {
    return <p className="text-slate-600">No doctors found.</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Doctors</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}