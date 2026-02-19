"use client";

import { use } from "react";
import { useDepartment } from "@/hooks/useDepartments";

export default function DepartmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useDepartment(id);

  if (isLoading) {
    return <p className="text-slate-600">Loading department details...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Department not found.</p>;
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-slate-700">{data.description}</p>
    </section>
  );
}
