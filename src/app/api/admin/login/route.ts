import { connectToDatabase } from "@/lib/db/mongoose";
import { type NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import * as jose from "jose";
import { getUserByEmail } from "@/lib/db/models/user.model";

export interface AdminTokenData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await getUserByEmail(email);

    // If user not found or password doesn't match
    if (!user) {
      throw new Error("User not found");
    }

    // If user not found or password doesn't match
    if (!(await bcryptjs.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    // Create tokenData - ensure it's a plain object with serializable values
    const adminTokenData: AdminTokenData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Three Days in seconds
    const threeDaysInSeconds = 3 * 24 * 60 * 60;

    // Check if JWT_SECRET_KEY exists
    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY is not defined");
      throw new Error("Internal server error");
    }

    // Create token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const token = await new jose.SignJWT({ ...adminTokenData }) // Spread the data to ensure it's a plain object
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${threeDaysInSeconds}s`)
      .sign(secret);

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        admin: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    const hostname = request.nextUrl.hostname;

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      maxAge: threeDaysInSeconds,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      domain: hostname.endsWith("financewithanne.com")
        ? ".financewithanne.com"
        : undefined,
    });

    return response;
  } catch (error) {
    console.error("Admin sign-in error:", error);
    return;
  }
}
