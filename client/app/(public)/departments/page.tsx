"use client";

import { DepartmentList } from "@/components/department/DepartmentList";
import { useDepartments } from "@/hooks/useDepartments";

export default function DepartmentsPage() {
  const { data } = useDepartments();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-900 to-cyan-800 p-6 text-white sm:p-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Clinical Departments</h1>
        <p className="mt-2 text-cyan-100">Explore all medical specialties at Roha Hospital and choose the right care pathway for your condition.</p>
        <p className="mt-4 text-sm font-semibold text-cyan-100">Currently listed: {data?.length ?? 0} departments</p>
      </section>
      <DepartmentList />
    </div>
  );
}
