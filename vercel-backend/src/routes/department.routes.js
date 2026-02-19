import { Router } from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  listDepartments,
  updateDepartment,
} from "../controllers/department.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createDepartmentSchema, idParamSchema, updateDepartmentSchema } from "../utils/validators.js";

const router = Router();

router.get("/", listDepartments);
router.get("/:id", validate(idParamSchema), getDepartmentById);
router.post("/", requireAuth, requireRole("admin"), validate(createDepartmentSchema), createDepartment);
router.patch("/:id", requireAuth, requireRole("admin"), validate(updateDepartmentSchema), updateDepartment);
router.delete("/:id", requireAuth, requireRole("admin"), validate(idParamSchema), deleteDepartment);

export default router;
