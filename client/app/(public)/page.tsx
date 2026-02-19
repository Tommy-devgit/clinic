"use client";

import Link from "next/link";
import { useBlogPosts } from "@/hooks/useBlog";
import { useDepartments } from "@/hooks/useDepartments";
import { useDoctors } from "@/hooks/useDoctors";

const highlights = [
  { title: "24/7 Emergency & Trauma", detail: "Rapid emergency response, ICU support, and trauma-ready specialists." },
  { title: "Specialist-Led Care", detail: "Cardiology, neurology, orthopedics, pediatrics, and more." },
  { title: "Digital Patient Journey", detail: "Book consultations, manage appointments, and access care updates online." },
];

export default function HomePage() {
  const { data: departments } = useDepartments();
  const { data: doctors } = useDoctors();
  const { data: posts } = useBlogPosts();

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-14">
      <section className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 py-10 text-white sm:rounded-3xl sm:px-8 sm:py-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4 sm:space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Roha Hospital</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Advanced care with the warmth patients deserve.</h1>
            <p className="max-w-2xl text-sm leading-6 text-cyan-100 sm:text-base">
              Roha Hospital combines multidisciplinary specialists, modern diagnostics, and digital-first patient support for safer outcomes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/appointment" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-sky-900">Book Appointment</Link>
              <Link href="/doctors" className="rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white">Find a Doctor</Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-cyan-100">Departments</p>
              <p className="mt-1 text-3xl font-bold">{departments?.length ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-cyan-100">Doctors</p>
              <p className="mt-1 text-3xl font-bold">{doctors?.length ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-cyan-100">Health Articles</p>
              <p className="mt-1 text-3xl font-bold">{posts?.length ?? 0}</p>
            </div>
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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Top Clinical Departments</h2>
          <Link href="/departments" className="text-sm font-semibold text-sky-700 hover:text-sky-800">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {(departments ?? []).slice(0, 3).map((department) => (
            <article key={department._id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">{department.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{department.description}</p>
              <Link href={`/departments/${department._id}`} className="mt-3 inline-block text-sm font-medium text-sky-700 hover:text-sky-800">
                View department
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Latest from Roha Health Journal</h2>
          <Link href="/blog" className="text-sm font-semibold text-sky-700 hover:text-sky-800">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {(posts ?? []).slice(0, 3).map((post) => (
            <article key={post._id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="line-clamp-2 font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.content}</p>
              <Link href={`/blog/${post._id}`} className="mt-3 inline-block text-sm font-medium text-sky-700 hover:text-sky-800">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
