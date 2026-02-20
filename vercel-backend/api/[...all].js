import app from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";

let databaseReady = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Ensure DB connection
  if (!databaseReady) {
    await connectDatabase();
    databaseReady = true;
  }

  // Handle CORS preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
  }

  // Pass everything else to Express
  return app(req, res);
}