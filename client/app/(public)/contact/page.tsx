"use client";

import { useDoctors } from "@/hooks/useDoctors";

export default function ContactPage() {
  const { data: doctors } = useDoctors();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-900 to-cyan-800 p-6 text-white sm:p-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Contact Roha Hospital</h1>
        <p className="mt-2 text-cyan-100">For appointments, admissions, reports, and support, reach us through the channels below.</p>
        <div className="mt-4 inline-flex rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm">
          On-duty specialist pool: {doctors?.length ?? 0} doctors
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-slate-900">Hospital Desk</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold">Emergency:</span> +1 (555) 010-2400</p>
            <p><span className="font-semibold">Appointments:</span> +1 (555) 010-2455</p>
            <p><span className="font-semibold">Email:</span> support@roha-hospital.com</p>
            <p><span className="font-semibold">Address:</span> 280 Health Avenue, Springfield, USA</p>
          </div>
          <p className="text-xs text-slate-500">Emergency services are available 24/7.</p>
        </section>

        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-slate-900">Send a Message</h2>
          <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Full name" />
          <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Email" />
          <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Subject" />
          <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={5} placeholder="Message" />
          <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">Submit</button>
        </section>
      </div>
    </div>
  );
}
