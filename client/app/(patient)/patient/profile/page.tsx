"use client";

import { usePatient } from "@/hooks/usePatient";

export default function PatientProfilePage() {
  const { data, isLoading, isError } = usePatient();

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading profile...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Unable to load profile.</p>;
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
      <h1 className="text-2xl font-semibold">Patient Profile</h1>
      <div className="space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-semibold">Name:</span> {data.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {data.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {data.role}
        </p>
      </div>
    </section>
  );
}
