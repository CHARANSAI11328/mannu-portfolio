import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("admin_session")?.value;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect mutating CMS API routes
  if (pathname.startsWith("/api/cms") && !pathname.startsWith("/api/cms/published")) {
    if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
      if (!sessionCookie) {
        return NextResponse.json(
          { error: "Unauthorized. Admin credentials required." },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/cms/:path*",
  ],
};
