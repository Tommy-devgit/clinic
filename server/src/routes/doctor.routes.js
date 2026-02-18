import { Router } from "express";
import { createDoctor, deleteDoctor, getDoctorById, listDoctors, updateDoctor } from "../controllers/doctor.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createDoctorSchema, idParamSchema, updateDoctorSchema } from "../utils/validators.js";

const router = Router();

router.get("/", listDoctors);
router.get("/:id", validate(idParamSchema), getDoctorById);
router.post("/", requireAuth, requireRole("admin"), validate(createDoctorSchema), createDoctor);
router.patch("/:id", requireAuth, requireRole("admin"), validate(updateDoctorSchema), updateDoctor);
router.delete("/:id", requireAuth, requireRole("admin"), validate(idParamSchema), deleteDoctor);

export default router;
