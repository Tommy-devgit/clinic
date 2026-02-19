import { DoctorList } from "@/components/doctor/DoctorList";

export default function DoctorsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Doctors</h1>
        <p className="mt-2 text-slate-600">Meet the consultants and specialists delivering evidence-based care across every department.</p>
      </section>
      <DoctorList />
    </div>
  );
}
