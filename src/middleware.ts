import { getIronSession } from 'iron-session/edge';
import { NextRequest, NextResponse } from 'next/server';
import { sessionOptions } from './server/session/options';

export async function middleware(req: NextRequest) {
  if (
    !req.nextUrl.pathname.startsWith('/_next') &&
    !req.nextUrl.pathname.startsWith('/login') &&
    !req.nextUrl.pathname.startsWith('/api/trpc/')
  ) {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.credentials) {
      return NextResponse.rewrite(new URL('/login', req.url));
    }
  }
}
