import { Department } from "../models/Department.js";

export async function listDepartments(_req, res, next) {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    return res.json(departments);
  } catch (error) {
    return next(error);
  }
}

export async function getDepartmentById(req, res, next) {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    return res.json(department);
  } catch (error) {
    return next(error);
  }
}

export async function createDepartment(req, res, next) {
  try {
    const department = await Department.create(req.body);
    return res.status(201).json(department);
  } catch (error) {
    return next(error);
  }
}

export async function updateDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.json(department);
  } catch (error) {
    return next(error);
  }
}

export async function deleteDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
