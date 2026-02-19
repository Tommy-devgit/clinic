"use client";

import { DoctorList } from "@/components/doctor/DoctorList";
import { useDoctors } from "@/hooks/useDoctors";

export default function DoctorsPage() {
  const { data } = useDoctors();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-900 to-cyan-800 p-6 text-white sm:p-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Our Doctors</h1>
        <p className="mt-2 text-cyan-100">Meet the consultants and specialists delivering evidence-based care across every department.</p>
        <p className="mt-4 text-sm font-semibold text-cyan-100">Active specialists: {data?.length ?? 0}</p>
      </section>
      <DoctorList />
    </div>
  );
}
