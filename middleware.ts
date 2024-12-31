import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { auth } from './auth';
import { NextRequest } from 'next/server';
import { defaultLocale } from './i18n/config';

const publicPages = ["/login"];

const intlMiddleware = createMiddleware(routing)

const authMiddleware = auth(req => {
  const locale = req.headers.get('NEXT_LOCALE') || defaultLocale
  const isLoggedIn = !!req.auth
  if (!isLoggedIn) {
    return Response.redirect(new URL(`/${locale}/login`, req.nextUrl))
  }
  return intlMiddleware(req)
})

export default function middleware(req: NextRequest) {
  const isPublicPage = publicPages.includes(req.nextUrl.pathname)
  return isPublicPage ? intlMiddleware(req) : (authMiddleware as any)(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};
