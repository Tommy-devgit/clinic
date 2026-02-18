import Link from "next/link";
import type { Doctor } from "@/types/doctor";
import { Card } from "@/components/ui/Card";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="space-y-2">
      <h3 className="font-semibold">{doctor.name}</h3>
      <p className="text-sm text-slate-600">{doctor.specialty}</p>
      {doctor.bio ? <p className="text-sm text-slate-500">{doctor.bio}</p> : null}
      <Link href={`/doctors/${doctor._id}`} className="text-sm font-medium text-sky-700 hover:text-sky-800">
        View profile
      </Link>
    </Card>
  );
}