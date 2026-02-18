"use client";

import { DepartmentCard } from "./DepartmentCard";
import { useDepartments } from "@/hooks/useDepartments";

export function DepartmentList() {
  const { data, isLoading, isError } = useDepartments();

  if (isLoading) {
    return <p className="text-slate-600">Loading departments...</p>;
  }

  if (isError) {
    return <p className="text-red-600">Unable to load departments right now.</p>;
  }

  if (!data?.length) {
    return <p className="text-slate-600">No departments found.</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Departments</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((department) => (
          <DepartmentCard key={department._id} department={department} />
        ))}
      </div>
    </section>
  );
}