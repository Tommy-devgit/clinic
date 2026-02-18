import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  listAppointments,
  updateAppointment,
} from "../controllers/appointment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAppointmentSchema, idParamSchema, updateAppointmentSchema } from "../utils/validators.js";

const router = Router();

router.use(requireAuth);
router.get("/", listAppointments);
router.get("/:id", validate(idParamSchema), getAppointmentById);
router.post("/", requireRole("patient"), validate(createAppointmentSchema), createAppointment);
router.patch("/:id", validate(updateAppointmentSchema), updateAppointment);
router.delete("/:id", validate(idParamSchema), deleteAppointment);

export default router;
