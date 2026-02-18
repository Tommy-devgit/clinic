import { Appointment } from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";

export async function listAppointments(req, res, next) {
  try {
    const filter = req.user.role === "patient" ? { patient: req.user.sub } : {};
    const appointments = await Appointment.find(filter)
      .populate("doctor")
      .populate("patient", "name email")
      .sort({ date: 1 });
    return res.json(appointments);
  } catch (error) {
    return next(error);
  }
}

export async function createAppointment(req, res, next) {
  try {
    const doctor = await Doctor.findById(req.body.doctor);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      ...req.body,
      patient: req.user.sub,
    });
    return res.status(201).json(appointment);
  } catch (error) {
    return next(error);
  }
}

export async function getAppointmentById(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctor")
      .populate("patient", "name email role");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (req.user.role === "patient" && appointment.patient._id.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(appointment);
  } catch (error) {
    return next(error);
  }
}

export async function updateAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (req.user.role === "patient" && appointment.patient.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.body.doctor) {
      const doctor = await Doctor.findById(req.body.doctor);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    if (req.user.role === "patient") {
      const safePatch = {
        date: req.body.date,
        notes: req.body.notes,
      };
      Object.assign(appointment, Object.fromEntries(Object.entries(safePatch).filter(([, value]) => value !== undefined)));
    } else {
      Object.assign(appointment, req.body);
    }

    await appointment.save();

    const populated = await Appointment.findById(appointment.id)
      .populate("doctor")
      .populate("patient", "name email role");
    return res.json(populated);
  } catch (error) {
    return next(error);
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (req.user.role === "patient" && appointment.patient.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
