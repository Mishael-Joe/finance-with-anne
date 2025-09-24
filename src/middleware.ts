import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware to protect admin routes
 * Runs before the request is completed
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /admin (excluding /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // console.log("token", token);

    // If no token or not an admin, redirect to login
    if (!token || token.role !== "admin") {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      url.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: ["/admin/:path*"],
};
