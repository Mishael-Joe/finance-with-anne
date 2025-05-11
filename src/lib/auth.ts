import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db/mongoose";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Define the User model interface
interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

/**
 * NextAuth.js configuration options
 * This is used by the [...nextauth] API route and can be imported elsewhere
 * to access the session on the server side
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Connect to the database
          await connectToDatabase();

          // Get the User model
          const UserModel =
            mongoose.models.User ||
            mongoose.model(
              "User",
              new mongoose.Schema({
                email: String,
                password: String,
                name: String,
                role: String,
              })
            );

          // Find the user by email
          const user = (await UserModel.findOne({
            email: credentials.email,
          })) as User | null;

          // If user not found or password doesn't match
          if (
            !user ||
            !(await bcrypt.compare(credentials.password, user.password))
          ) {
            throw new Error("Invalid email or password");
          }

          // Return the user object (excluding the password)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user role to the token if available
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user role and id to the session
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Helper function to check if a user is authenticated and has admin role
 * @param session The user session
 * @returns Boolean indicating if the user is an admin
 */
export function isAdmin(session: any) {
  return session?.user?.role === "admin";
}
