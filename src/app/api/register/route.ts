import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Define validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * POST handler for user registration
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request body
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Connect to the database
    await connectToDatabase();

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
            role: { type: String, default: "user" },
          },
          { timestamps: true }
        )
      );

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
    });

    await user.save();

    // Return success response (excluding password)
    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
