export default function ContactPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-bold">Contact Roha Hospital</h1>
        <p className="text-slate-600">Reach our patient support desk for appointments, admissions, and records assistance.</p>
        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-semibold">Emergency:</span> +1 (555) 010-2400</p>
          <p><span className="font-semibold">Front Desk:</span> +1 (555) 010-2455</p>
          <p><span className="font-semibold">Email:</span> support@roha-hospital.com</p>
          <p><span className="font-semibold">Address:</span> 280 Health Avenue, Springfield, USA</p>
        </div>
      </section>
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Send a Message</h2>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Full name" />
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Email" />
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Subject" />
        <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={5} placeholder="Message" />
        <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">Submit</button>
      </section>
    </div>
  );
}