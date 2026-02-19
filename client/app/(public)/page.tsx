import Link from "next/link";
import { DepartmentList } from "@/components/department/DepartmentList";

const highlights = [
  { title: "24/7 Emergency & Trauma", detail: "Rapid emergency response, ICU support, and trauma-ready specialists." },
  { title: "Specialist-Led Care", detail: "Cardiology, neurology, orthopedics, pediatrics, and more." },
  { title: "Digital Patient Journey", detail: "Book consultations, manage appointments, and access care updates online." },
];

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-14">
      <section className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 py-10 text-white sm:rounded-3xl sm:px-8 sm:py-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-[1.3fr_0.9fr] md:items-end">
          <div className="space-y-4 sm:space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Roha Hospital</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Trusted care for every stage of life.</h1>
            <p className="max-w-2xl text-sm leading-6 text-cyan-100 sm:text-base">
              From emergency interventions to long-term specialist follow-up, Roha Hospital combines modern technology with compassionate care to deliver safer outcomes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/appointment" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-sky-900">Book Appointment</Link>
              <Link href="/doctors" className="rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white">Find a Doctor</Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:p-5">
            <p className="text-sm font-semibold">Quick Access</p>
            <ul className="mt-3 space-y-2 text-sm text-cyan-50">
              <li>Emergency hotline: +1 (555) 010-2400</li>
              <li>Outpatient hours: 8:00 AM - 8:00 PM</li>
              <li>Online booking available 24/7</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:gap-6 sm:p-7 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Clinical Outcomes</p>
          <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">Quality metrics that patients can trust</h2>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-3xl font-bold text-slate-900">98%</p>
          <p className="text-sm text-slate-600">Patient satisfaction score</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-3xl font-bold text-slate-900">45+</p>
          <p className="text-sm text-slate-600">Consultants and specialists</p>
        </div>
      </section>

      <DepartmentList />
    </div>
  );
}
