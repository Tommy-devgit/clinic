"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, initialized, setUser } = useAuthContext();
  const { logout } = useAuth();

  const portalHref = user?.role === "admin" ? "/admin/dashboard" : "/patient/dashboard";
  const badgeLabel = user ? `${user.role.toUpperCase()}: ${user.name}` : null;

  async function handleLogout() {
    try {
      await logout.mutateAsync();
    } finally {
      setUser(null);
      setOpen(false);
      router.push("/");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          Roha Hospital
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>

        <div className="hidden flex-wrap items-center gap-2 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-md px-3 py-1.5 transition hover:bg-sky-50 hover:text-sky-800">
              {link.label}
            </Link>
          ))}
          <Link href="/appointment" className="rounded-md bg-sky-700 px-3 py-1.5 text-white transition hover:bg-sky-800">
            Book Appointment
          </Link>

          {initialized && user ? (
            <>
              <span className="rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800">
                {badgeLabel}
              </span>
              <Link href={portalHref} className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 transition hover:border-sky-300 hover:text-sky-800">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-red-300 px-3 py-1.5 text-red-700 transition hover:bg-red-50"
                disabled={logout.isPending}
              >
                {logout.isPending ? "Signing out..." : "Logout"}
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 transition hover:border-sky-300 hover:text-sky-800">
              Login
            </Link>
          )}
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-slate-200 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 transition hover:bg-sky-50 hover:text-sky-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="rounded-md bg-sky-700 px-3 py-2 text-center text-white transition hover:bg-sky-800"
            >
              Book Appointment
            </Link>

            {initialized && user ? (
              <>
                <span className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-center text-xs font-semibold text-sky-800">
                  {badgeLabel}
                </span>
                <Link
                  href={portalHref}
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-center text-slate-700 transition hover:border-sky-300 hover:text-sky-800"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md border border-red-300 px-3 py-2 text-red-700 transition hover:bg-red-50"
                  disabled={logout.isPending}
                >
                  {logout.isPending ? "Signing out..." : "Logout"}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-md border border-slate-300 px-3 py-2 text-center text-slate-700 transition hover:border-sky-300 hover:text-sky-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
