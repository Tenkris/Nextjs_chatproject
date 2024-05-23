import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  console.log('Middleware is running...'); // Debugging line
  const user = await getToken({ req: request, secret: process.env.SECRET });

  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/profile') && !user) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }
  if (pathname.startsWith('/sign-in') && user) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }
  if (pathname.startsWith('/sign-up') && user) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
