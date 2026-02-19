import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Roha Hospital</h2>
          <p className="text-sm text-slate-300">Compassionate, evidence-based care across emergency, specialist, and preventive services.</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-100">Quick Links</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/departments" className="hover:text-white">Departments</Link></li>
            <li><Link href="/doctors" className="hover:text-white">Doctors</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-100">Patient Support</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>Emergency: +1 (555) 010-2400</li>
            <li>Appointments: +1 (555) 010-2455</li>
            <li>Email: support@roha-hospital.com</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-100">Address</h3>
          <p className="text-sm text-slate-300">280 Health Avenue, Springfield, USA</p>
          <p className="mt-3 text-xs text-slate-400">Open 24/7 for emergency and critical care.</p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        2026 Roha Hospital. All rights reserved.
      </div>
    </footer>
  );
}