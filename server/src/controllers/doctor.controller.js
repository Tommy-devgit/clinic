import { Doctor } from "../models/Doctor.js";
import { Department } from "../models/Department.js";

export async function listDoctors(_req, res, next) {
  try {
    const doctors = await Doctor.find().populate("department").sort({ createdAt: -1 });
    return res.json(doctors);
  } catch (error) {
    return next(error);
  }
}

export async function getDoctorById(req, res, next) {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.json(doctor);
  } catch (error) {
    return next(error);
  }
}

export async function createDoctor(req, res, next) {
  try {
    if (req.body.department) {
      const department = await Department.findById(req.body.department);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
    }

    const doctor = await Doctor.create(req.body);
    return res.status(201).json(doctor);
  } catch (error) {
    return next(error);
  }
}

export async function updateDoctor(req, res, next) {
  try {
    if (req.body.department) {
      const department = await Department.findById(req.body.department);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("department");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.json(doctor);
  } catch (error) {
    return next(error);
  }
}

export async function deleteDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
