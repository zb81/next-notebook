export { auth as middleware } from './auth'

export const config = {
  matcher: [
    /**
     * except for the ones starting with:
     * - _next/static
     * - favicon.ico
     * - login
     * - api/auth
     */
    "/((?!login|api/auth|_next/static|favicon.ico).*)"
  ],
};
