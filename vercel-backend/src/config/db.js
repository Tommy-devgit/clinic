import mongoose from "mongoose";

let cachedConnection = null;

export async function connectDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  cachedConnection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  return cachedConnection;
}
