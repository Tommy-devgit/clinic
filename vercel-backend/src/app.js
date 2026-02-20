import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { errorHandler } from "./middlewares/error.middleware.js";
import { apiRateLimiter } from "./middlewares/rate-limit.middleware.js";

import adminRoutes from "./routes/admin.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import patientRoutes from "./routes/patient.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// SECURITY HEADERS
app.use(helmet());

// CORS - handled here + in catch-all for redundancy/safety
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(apiRateLimiter);

// HEALTH CHECK & ROOT
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "Roha Hospital Backend", basePath: "/api" });
});

// API ROUTES – IMPORTANT: no /api prefix anymore (handled by catch-all rewrite)
app.use("/auth", authRoutes);
app.use("/departments", departmentRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/patients", patientRoutes);
app.use("/admin", adminRoutes);
app.use("/blog", blogRoutes);

// ERROR HANDLER (must be last)
app.use(errorHandler);

export default app;