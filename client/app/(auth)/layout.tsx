import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_460px] lg:items-center">
      <section className="hidden rounded-3xl bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 p-10 text-white lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Roha Hospital Portal</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight">Secure access for patients and staff.</h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-cyan-100">
          Manage appointments, review care timelines, and access your hospital dashboard with role-based secure login.
        </p>
        <div className="mt-8 space-y-2 rounded-2xl border border-white/20 bg-white/10 p-5 text-sm">
          <p>24/7 Emergency: +1 (555) 010-2400</p>
          <p>Outpatient Support: +1 (555) 010-2455</p>
          <p>Email: support@roha-hospital.com</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="mb-6 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
          Back to Roha Hospital
        </Link>
        {children}
      </section>
    </main>
  );
}
