import Link from "next/link";
import { DepartmentList } from "@/components/department/DepartmentList";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-r from-cyan-700 to-sky-900 px-8 py-12 text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]">Roha Hospital</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight">Advanced care, trusted specialists, and fast appointment booking.</h1>
        <p className="mt-4 max-w-2xl text-sky-100">
          Roha Hospital delivers patient-first healthcare across emergency care, surgery, diagnostics, and specialist consultations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/appointment" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-sky-900">Book Appointment</Link>
          <Link href="/departments" className="rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white">Explore Departments</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">24/7 Emergency</h2>
          <p className="mt-2 text-sm text-slate-600">Round-the-clock emergency response with trauma-ready teams.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Specialist Teams</h2>
          <p className="mt-2 text-sm text-slate-600">Multi-disciplinary doctors collaborating for better outcomes.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Digital Booking</h2>
          <p className="mt-2 text-sm text-slate-600">Simple appointment booking with real-time doctor selection.</p>
        </div>
      </section>

      <DepartmentList />
    </div>
  );
}