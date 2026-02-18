"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppointmentMutations } from "@/hooks/useAppointments";
import { useDoctors } from "@/hooks/useDoctors";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const schema = z.object({
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please choose a date and time"),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

export function BookingStepper() {
  const { data: doctors, isLoading } = useDoctors();
  const { create } = useAppointmentMutations();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { doctor: "", date: "", notes: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await create.mutateAsync(values);
    form.reset();
  });

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Book an Appointment</h1>
      <p className="text-sm text-slate-600">Complete the form below to reserve your consultation slot.</p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="doctor">Doctor</label>
          <select
            id="doctor"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...form.register("doctor")}
            disabled={isLoading}
          >
            <option value="">Select a doctor</option>
            {doctors?.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>{doctor.name} - {doctor.specialty}</option>
            ))}
          </select>
          {form.formState.errors.doctor ? <p className="text-xs text-red-600">{form.formState.errors.doctor.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="date">Date and Time</label>
          <Input id="date" type="datetime-local" {...form.register("date")} />
          {form.formState.errors.date ? <p className="text-xs text-red-600">{form.formState.errors.date.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            rows={4}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Describe symptoms or concerns"
            {...form.register("notes")}
          />
        </div>

        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? "Booking..." : "Confirm Appointment"}
        </Button>
        {create.isError ? <p className="text-sm text-red-600">Unable to create appointment. Please try again.</p> : null}
        {create.isSuccess ? <p className="text-sm text-emerald-700">Appointment request submitted.</p> : null}
      </form>
    </section>
  );
}