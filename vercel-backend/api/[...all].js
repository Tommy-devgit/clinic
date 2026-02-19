import app from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";

let databaseReady = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!databaseReady) {
    await connectDatabase();
    databaseReady = true;
  }

  return app(req, res);
}
