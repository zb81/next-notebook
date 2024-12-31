import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from 'next-auth/providers/google'

import prisma from "./lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
            password: credentials.password as string,
          }
        })

        console.log(user)
        if (!user) {
          throw new Error("Invalid credentials.")
        }
        return user
      }
    })
  ]
})
