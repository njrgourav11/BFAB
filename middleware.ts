import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow the root path, Next.js internal paths, APIs, images, and other static assets
  if (
    path === '/' ||
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.startsWith('/images') ||
    path.startsWith('/other') ||
    path.startsWith('/category') ||
    path.match(/\.(png|svg|jpg|jpeg|gif|webp|avif|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect all other requests to the coming soon page at root
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  // Apply middleware to all routes except Next.js internals and API routes
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
