import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">Roha Hospital</Link>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/about" className="hover:text-sky-700">About</Link>
          <Link href="/departments" className="hover:text-sky-700">Departments</Link>
          <Link href="/doctors" className="hover:text-sky-700">Doctors</Link>
          <Link href="/blog" className="hover:text-sky-700">Blog</Link>
          <Link href="/contact" className="hover:text-sky-700">Contact</Link>
          <Link href="/appointment" className="rounded-md bg-sky-700 px-3 py-1.5 text-white hover:bg-sky-800">Book</Link>
          <Link href="/login" className="hover:text-sky-700">Login</Link>
        </div>
      </nav>
    </header>
  );
}
