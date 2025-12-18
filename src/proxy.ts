import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/admin'];

// Next.js 16: proxy replaces middleware
export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // 4. Redirect to /login if the user is not authenticated
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  
  // 5. Role based access control
  if (path.startsWith('/admin') && session.user.role !== 'ADMIN') {
     // If Sales tries to access Admin, redirect to Dashboard
     return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
