import { BookingStepper } from "@/components/appointment/BookingStepper";

export default function AppointmentPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Appointment Booking</h1>
      <p className="text-slate-600">Reserve your consultation in a few steps with Roha Hospital.</p>
      <BookingStepper />
    </div>
  );
}
