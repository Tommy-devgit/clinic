import { DepartmentList } from "@/components/department/DepartmentList";

export default function DepartmentsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Clinical Departments</h1>
        <p className="mt-2 text-slate-600">Explore all medical specialties at Roha Hospital and choose the right care pathway for your condition.</p>
      </section>
      <DepartmentList />
    </div>
  );
}
