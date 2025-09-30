import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("adminToken")?.value;
  console.log("Middleware triggered for path:", pathname);

  // Check if the path starts with /admin (excluding /admin/login)
  const isAdminPage = (pathname: string) => {
    return pathname.startsWith("/admin") && pathname !== "/admin/login";
  };

  // If it is an admin page and no adminToken, redirect to admin login page
  if (isAdminPage(pathname) && !adminToken) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("callbackUrl", request.url);
    url.searchParams.set("error", "AccessDenied");
    return NextResponse.redirect(url);
  }

  // Everything else is allowed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run middleware only on routes that start with `/admin`
    // Next.js automatically excludes _next/static and _next/image
    "/admin/:path*",
  ],
};
