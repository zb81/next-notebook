export { auth as middleware } from './auth'

export const config = {
  matcher: [
    // start with `/edit`
    '/edit(/.*)?',
  ],
}
