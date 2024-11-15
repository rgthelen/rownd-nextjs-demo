import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withRowndMiddleware } from '@rownd/next/server';

export const middleware = withRowndMiddleware((request: NextRequest) => {
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/api/rownd-token-callback",
    '/dashboard/:path*',
  ]
}; 