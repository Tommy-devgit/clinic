"use client";

import { BookingStepper } from "@/components/appointment/BookingStepper";
import { useDepartments } from "@/hooks/useDepartments";
import { useDoctors } from "@/hooks/useDoctors";

export default function AppointmentPage() {
  const { data: departments } = useDepartments();
  const { data: doctors } = useDoctors();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-900 to-cyan-800 p-6 text-white sm:p-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Book an Appointment</h1>
        <p className="mt-2 text-cyan-100">Select your doctor, choose a suitable slot, and submit your visit request in minutes.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm">
            Available departments: {departments?.length ?? 0}
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm">
            Available doctors: {doctors?.length ?? 0}
          </div>
        </div>
      </section>
      <BookingStepper />
    </div>
  );
}
