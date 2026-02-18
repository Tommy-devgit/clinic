import { DoctorList } from "@/components/doctor/DoctorList";

export default function DoctorsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Doctors</h1>
      <p className="text-slate-600">Meet our experienced consultants and specialists.</p>
      <DoctorList />
    </div>
  );
}
