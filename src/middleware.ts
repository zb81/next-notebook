export { auth as middleware } from './auth'

export const config = {
  matcher: [
    /**
     * except for the ones starting with:
     * - _next/static
     * - favicon.ico
     * - sign-in
     * - sign-up
     * - api/auth
     * - api/signup
     */
    '/((?!sign-in|sign-up|api/auth|api/signup|_next/static|favicon.ico).*)',
  ],
}
