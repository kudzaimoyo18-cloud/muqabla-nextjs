import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/feed', '/search', '/profile', '/messages', '/employer'];
const authRoutes = ['/auth/login', '/auth/signup', '/auth/verify'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route needs protection
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get the session token from cookies
  const supabaseToken = request.cookies.get('sb-ssttxhadegoyiianjitw-auth-token')?.value;

  if (isProtected && !supabaseToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && supabaseToken) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/feed/:path*', '/search/:path*', '/profile/:path*', '/messages/:path*', '/employer/:path*', '/auth/:path*'],
};
