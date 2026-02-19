import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/User.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME;

async function seedAdmin() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(mongoUri);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = "admin";
    if (password) {
      existing.password = await bcrypt.hash(password, 10);
    }
    existing.name = name;
    await existing.save();
    console.log(`Updated admin account: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: passwordHash,
    role: "admin",
  });

  console.log(`Created admin account: ${email}`);
}

seedAdmin()
  .catch((error) => {
    console.error("Failed to seed admin", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
