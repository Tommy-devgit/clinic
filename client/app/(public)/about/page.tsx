export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Roha Hospital</h1>
      <p className="max-w-3xl text-slate-700">
        Roha Hospital is a modern care center focused on clinical excellence, ethical treatment, and patient safety. Our integrated units include emergency medicine, critical care, surgery, diagnostic imaging, and outpatient specialty services.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4"><h2 className="font-semibold">Mission</h2><p className="mt-2 text-sm text-slate-600">Deliver safe and accessible healthcare for every patient.</p></div>
        <div className="rounded-lg border border-slate-200 bg-white p-4"><h2 className="font-semibold">Vision</h2><p className="mt-2 text-sm text-slate-600">Be the most trusted hospital for coordinated specialist care.</p></div>
        <div className="rounded-lg border border-slate-200 bg-white p-4"><h2 className="font-semibold">Values</h2><p className="mt-2 text-sm text-slate-600">Compassion, accountability, transparency, and innovation.</p></div>
      </div>
    </div>
  );
}