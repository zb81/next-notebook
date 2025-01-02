import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import prisma from "./lib/prisma"
import { comparePassword } from "./lib/crypt"

class InvalidCredentials extends CredentialsSignin {
  code = "invalid_credentials"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: { login: {}, password: {} },
    async authorize(credentials) {
      const login = credentials.login as string
      const password = credentials.password as string
      const user = await prisma.user.findFirst({
        where: { OR: [{ username: login }, { email: login }] }
      })
      if (!user) {
        throw new InvalidCredentials()
      }
      if (await comparePassword(password, user.salt, user.password)) {
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        }
      }
      throw new InvalidCredentials()
    }
  })],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
    async signIn() {
      return true
    },
    session({ session }) {
      return session
    }
  }
})
