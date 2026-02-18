"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useDepartments } from "@/hooks/useDepartments";
import { useDoctorMutations, useDoctors } from "@/hooks/useDoctors";

export default function AdminDoctorsPage() {
  const { data: departments } = useDepartments();
  const { data: doctors, isLoading, isError } = useDoctors();
  const { create, remove } = useDoctorMutations();
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await create.mutateAsync({ name, specialty, department: department || undefined, bio });
    setName("");
    setSpecialty("");
    setDepartment("");
    setBio("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Doctor Management</h1>

      <form onSubmit={handleCreate} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Add Doctor</h2>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Doctor name" value={name} onChange={(event) => setName(event.target.value)} required />
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)} required />
        <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={department} onChange={(event) => setDepartment(event.target.value)}>
          <option value="">Select department</option>
          {departments?.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={3} placeholder="Short bio" value={bio} onChange={(event) => setBio(event.target.value)} />
        <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={create.isPending}>{create.isPending ? "Saving..." : "Create Doctor"}</button>
      </form>

      <section className="space-y-3">
        <h2 className="font-semibold">All Doctors</h2>
        {isLoading ? <p className="text-sm text-slate-600">Loading doctors...</p> : null}
        {isError ? <p className="text-sm text-red-600">Failed to load doctors.</p> : null}
        {doctors?.map((doctor) => (
          <div key={doctor._id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{doctor.name}</p>
              <p className="text-sm text-slate-600">{doctor.specialty}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/doctors/${doctor._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">Edit</Link>
              <button onClick={() => remove.mutate(doctor._id)} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
