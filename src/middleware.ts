import { type NextRequest, NextResponse } from 'next/server';

import { betterFetch } from '@better-fetch/fetch';

import type { auth } from '@/lib/auth';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') ?? '', // Forward the cookies from the request
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/subscribe'], // Apply middleware to specific routes
};
