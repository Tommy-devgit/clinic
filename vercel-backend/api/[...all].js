import app from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";

let databaseReady = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // CONNECT DATABASE ON FIRST REQUEST
  if (!databaseReady) {
    await connectDatabase();
    databaseReady = true;
  }

  // CORS HEADERS – must be set for every request including preflight
  const allowedOrigin = "https://rohahospitalmanagement.vercel.app"; // your frontend
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // HANDLE PRE-FLIGHT OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // respond immediately
  }

  // PASS REQUEST TO EXPRESS APP
  return app(req, res);
}