export { auth as middleware } from './auth'

export const config = {
  matcher: [
    /**
     * except for the ones starting with:
     * - _next/static
     * - favicon.ico
     * - login
     * - signup
     * - api/auth
     * - api/signup
     */
    "/((?!login|signup|api/auth|api/signup|_next/static|favicon.ico).*)"
  ],
};
