import { Appointment } from "../models/Appointment.js";
import { Department } from "../models/Department.js";
import { Doctor } from "../models/Doctor.js";
import { User } from "../models/User.js";

export async function getStats(_req, res, next) {
  try {
    const [users, doctors, departments, appointments] = await Promise.all([
      User.countDocuments(),
      Doctor.countDocuments(),
      Department.countDocuments(),
      Appointment.countDocuments(),
    ]);

    return res.json({ users, doctors, departments, appointments });
  } catch (error) {
    return next(error);
  }
}
