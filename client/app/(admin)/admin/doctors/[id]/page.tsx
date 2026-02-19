"use client";

import { use, useState } from "react";
import { useDepartments } from "@/hooks/useDepartments";
import { useDoctor, useDoctorMutations } from "@/hooks/useDoctors";

export default function AdminDoctorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useDoctor(id);
  const { data: departments } = useDepartments();
  const { update } = useDoctorMutations();

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");

  if (isLoading) {
    return <p className="text-slate-600">Loading doctor...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Doctor not found.</p>;
  }

  const initialName = name || data.name;
  const initialSpecialty = specialty || data.specialty;
  const initialDepartment = department || (typeof data.department === "string" ? data.department : data.department?._id || "");
  const initialBio = bio || data.bio || "";

  return (
    <form
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await update.mutateAsync({ id, payload: { name: initialName, specialty: initialSpecialty, department: initialDepartment || undefined, bio: initialBio } });
      }}
    >
      <h1 className="text-2xl font-semibold">Edit Doctor</h1>
      <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialName} onChange={(event) => setName(event.target.value)} required />
      <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialSpecialty} onChange={(event) => setSpecialty(event.target.value)} required />
      <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialDepartment} onChange={(event) => setDepartment(event.target.value)}>
        <option value="">Select department</option>
        {departments?.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
      </select>
      <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={4} value={initialBio} onChange={(event) => setBio(event.target.value)} />
      <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={update.isPending}>{update.isPending ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
