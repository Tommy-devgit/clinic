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
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">About Roha Hospital</h1>
        <p className="mt-3 max-w-4xl text-slate-700">
          Roha Hospital is a multidisciplinary care center delivering emergency, surgical, medical, and preventive services. We combine experienced clinicians, robust nursing standards, and digital systems to provide reliable care from first visit to recovery.
        </p>
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
