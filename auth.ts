import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import prisma from "./lib/prisma"
import { comparePassword } from "./lib/crypt"

class InValidCredentialsError extends CredentialsSignin {
  code = 'invalid_credentials'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: { identifier: {}, password: {} },
    async authorize(credentials) {
      const login = credentials.identifier as string
      const password = credentials.password as string
      const user = await prisma.user.findFirst({
        where: { OR: [{ username: login }, { email: login }] }
      })

      if (user && await comparePassword(password, user.salt, user.password)) {
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        }
      }

      throw new InValidCredentialsError()
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
    session({ session, token }) {
      session.user.id = token.sub!
      return session
    },
  }
})
