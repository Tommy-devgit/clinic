import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
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

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(apiRateLimiter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "Roha Hospital Backend", basePath: "/api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);

app.use(errorHandler);

export default app;
