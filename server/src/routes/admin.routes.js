import { Router } from "express";
import { getStats } from "../controllers/admin.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/stats", requireAuth, requireRole("admin"), getStats);

export default router;
