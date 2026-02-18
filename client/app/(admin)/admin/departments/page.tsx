"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useDepartmentMutations, useDepartments } from "@/hooks/useDepartments";

export default function AdminDepartmentsPage() {
  const { data, isLoading, isError } = useDepartments();
  const { create, remove } = useDepartmentMutations();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await create.mutateAsync({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Department Management</h1>

      <form onSubmit={handleCreate} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Create Department</h2>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Department name" value={name} onChange={(event) => setName(event.target.value)} required />
        <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Description" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} required />
        <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={create.isPending}>
          {create.isPending ? "Saving..." : "Create Department"}
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="font-semibold">All Departments</h2>
        {isLoading ? <p className="text-sm text-slate-600">Loading departments...</p> : null}
        {isError ? <p className="text-sm text-red-600">Failed to load departments.</p> : null}
        {data?.map((department) => (
          <div key={department._id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{department.name}</p>
              <p className="text-sm text-slate-600">{department.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/departments/${department._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">Edit</Link>
              <button onClick={() => remove.mutate(department._id)} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
