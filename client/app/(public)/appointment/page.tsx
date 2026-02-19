import { BookingStepper } from "@/components/appointment/BookingStepper";

export default function AppointmentPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Book an Appointment</h1>
        <p className="mt-2 text-slate-600">Select your doctor, choose a suitable slot, and submit your visit request in minutes.</p>
      </section>
      <BookingStepper />
    </div>
  );
}
