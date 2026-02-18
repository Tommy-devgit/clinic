import Link from "next/link";
import type { Department } from "@/types/department";
import { Card } from "@/components/ui/Card";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Card className="space-y-2">
      <h3 className="font-semibold">{department.name}</h3>
      <p className="text-sm text-slate-600">{department.description}</p>
      <Link href={`/departments/${department._id}`} className="text-sm font-medium text-sky-700 hover:text-sky-800">
        View department
      </Link>
    </Card>
  );
}