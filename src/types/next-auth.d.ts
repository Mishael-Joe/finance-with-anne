import type { DefaultSession } from "next-auth";

/**
 * Extend the built-in session types from NextAuth
 * This adds custom properties to the session.user object
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

/**
 * Extend the JWT type to include custom properties
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
