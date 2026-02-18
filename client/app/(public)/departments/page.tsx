import { DepartmentList } from "@/components/department/DepartmentList";

export default function DepartmentsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Departments</h1>
      <p className="text-slate-600">Browse all specialty departments at Roha Hospital.</p>
      <DepartmentList />
    </div>
  );
}
