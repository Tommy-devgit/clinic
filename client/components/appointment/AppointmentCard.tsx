import type { Appointment } from "@/types/appointment";
import { Card } from "@/components/ui/Card";
import { formatAppointmentDate } from "@/lib/date";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const doctorName = typeof appointment.doctor === "string" ? appointment.doctor : appointment.doctor.name;

  return (
    <Card className="space-y-2">
      <h3 className="font-semibold">{doctorName}</h3>
      <p className="text-sm text-slate-600">{formatAppointmentDate(new Date(appointment.date))}</p>
      <p className="text-sm capitalize text-slate-700">Status: {appointment.status}</p>
      {appointment.notes ? <p className="text-sm text-slate-500">{appointment.notes}</p> : null}
    </Card>
  );
}