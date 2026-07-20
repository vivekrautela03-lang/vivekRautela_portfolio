import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /admin/dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    const adminAuth = request.cookies.get("admin_auth")?.value;

    if (adminAuth !== "true") {
      // Redirect to admin login page
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all subpaths of /admin
  matcher: ["/admin/:path*"],
};
