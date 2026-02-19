import { Router } from "express";
import { getProfile } from "../controllers/patient.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/profile", requireAuth, requireRole("patient"), getProfile);

export default router;
