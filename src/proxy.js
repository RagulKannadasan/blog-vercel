import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request) {
  // Allow API routes to be handled by the route itself, but we can protect /api/posts here too
  // Actually, API routes should return JSON on auth failure, not redirect.
  // We'll handle /api/posts inside its own route to be safe, or just redirect. Let's return 401 for /api requests.
  
  const token = request.cookies.get('auth_token')?.value;

  const isApi = request.nextUrl.pathname.startsWith('/api');

  if (!token) {
    return isApi 
      ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'secret';
    const key = new TextEncoder().encode(secretKey);
    await jwtVerify(token, key);
    return NextResponse.next();
  } catch (error) {
    return isApi 
      ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/editor/:path*', '/api/posts/:path*'],
};
