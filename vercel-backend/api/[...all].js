import app from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";

let databaseReady = false;

export const config = {
  api: {
    bodyParser: false, // Let express.json() handle body parsing
  },
};

export default async function handler(req, res) {
  // Connect to database lazily (once per instance in serverless)
  if (!databaseReady) {
    try {
      await connectDatabase();
      databaseReady = true;
    } catch (err) {
      console.error("Database connection error:", err);
      if (!res.headersSent) {
        return res.status(500).json({ error: "Database connection failed" });
      }
    }
  }

  // Always set CORS headers (even on errors & preflight)
  const allowedOrigin = "https://rohahospitalmanagement.vercel.app";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  // Handle CORS preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ───────────────────────────────────────────────────────────────
  // CRITICAL FIX: Remove /api prefix so Express matches your routes
  //   /api/auth/login   →   /auth/login
  //   /api/health       →   /health
  // ───────────────────────────────────────────────────────────────
  if (req.url.startsWith("/api/")) {
    req.url = req.url.replace(/^\/api\//, "/");
  } else if (req.url.startsWith("/api")) {
    req.url = req.url.replace(/^\/api/, "/");
  }

  // Update path property (some middleware use req.path)
  req.path = req.url.split("?")[0];

  // Fix forwarded headers for cors, helmet, etc. in Vercel
  req.headers.host = req.headers["x-forwarded-host"] || req.headers.host || "rohahospitalbackend.vercel.app";
  req.protocol = req.headers["x-forwarded-proto"] || "https";

  // Pass control to Express
  app(req, res);

  // Safety: if Express forgets to end response (very rare), force close
  setImmediate(() => {
    if (!res.writableEnded && !res.headersSent) {
      res.status(404).json({ error: "No matching route found" });
    }
  });
}