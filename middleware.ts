import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  const maintenanceUrl = new URL("/maintenance", request.url);
  return NextResponse.redirect(maintenanceUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|maintenance).*)",
  ],
};
