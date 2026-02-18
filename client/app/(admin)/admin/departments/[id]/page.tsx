"use client";

import { useState } from "react";
import { useDepartment, useDepartmentMutations } from "@/hooks/useDepartments";

export default function AdminDepartmentEditPage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useDepartment(params.id);
  const { update } = useDepartmentMutations();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const initialName = name || data?.name || "";
  const initialDescription = description || data?.description || "";

  if (isLoading) {
    return <p className="text-slate-600">Loading department...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Department not found.</p>;
  }

  return (
    <form
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await update.mutateAsync({ id: params.id, payload: { name: initialName, description: initialDescription } });
      }}
    >
      <h1 className="text-2xl font-semibold">Edit Department</h1>
      <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialName} onChange={(event) => setName(event.target.value)} required />
      <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={4} value={initialDescription} onChange={(event) => setDescription(event.target.value)} required />
      <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={update.isPending}>{update.isPending ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}