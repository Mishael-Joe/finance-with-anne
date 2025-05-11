/**
 * This script creates a super admin user
 * Run with: tsx scripts/create-admin.ts
 */

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function createSuperAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get or create the User model
    const UserModel =
      mongoose.models.User ||
      mongoose.model(
        "User",
        new mongoose.Schema(
          {
            name: String,
            email: { type: String, unique: true },
            password: String,
            role: { type: String },
          },
          { timestamps: true }
        )
      );

    // Create super admin credentials
    const name = "Mishael Joseph Etukudo";
    const email = "mishaeljoe55@gmail.com"; // Change this to your email
    const password = "aacc5566"; // Change this to a secure password

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create super admin
    const superAdmin = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await superAdmin.save();
    console.log("admin created successfully:", email);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating super admin:", error);
    process.exit(1);
  }
}

createSuperAdmin();
