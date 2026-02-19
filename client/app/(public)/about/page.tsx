"use client";

import { useDepartments } from "@/hooks/useDepartments";
import { useDoctors } from "@/hooks/useDoctors";

const values = [
  {
    title: "Patient Safety First",
    detail: "Every protocol and care pathway is designed around measurable safety standards.",
  },
  {
    title: "Collaborative Specialists",
    detail: "Our consultants coordinate across departments for better diagnosis and treatment decisions.",
  },
  {
    title: "Evidence-Based Practice",
    detail: "We adopt clinical guidelines, audits, and modern diagnostics to improve outcomes.",
  },
];

export default function AboutPage() {
  const { data: departments } = useDepartments();
  const { data: doctors } = useDoctors();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-900 to-cyan-800 p-6 text-white sm:p-8">
        <h1 className="text-3xl font-bold sm:text-4xl">About Roha Hospital</h1>
        <p className="mt-3 max-w-4xl text-sm text-cyan-100 sm:text-base">
          Roha Hospital is a multidisciplinary care center delivering emergency, surgical, medical, and preventive services with strong clinical governance and a patient-first model.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg border border-white/20 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-100">Active Departments</p>
            <p className="mt-1 text-2xl font-bold">{departments?.length ?? 0}</p>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-100">Specialist Doctors</p>
            <p className="mt-1 text-2xl font-bold">{doctors?.length ?? 0}</p>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-100">Emergency Coverage</p>
            <p className="mt-1 text-2xl font-bold">24/7</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{value.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{value.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold">Mission</h3>
          <p className="mt-2 text-sm text-slate-600">To deliver timely, ethical, and affordable healthcare while maintaining high clinical quality.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold">Vision</h3>
          <p className="mt-2 text-sm text-slate-600">To be the region&apos;s most trusted hospital for integrated and specialist-led patient care.</p>
        </div>
      </section>
    </div>
  );
}
