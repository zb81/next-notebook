import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'

import prisma from "./lib/prisma"
import { User } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        let user: User | null = await prisma.user.findUnique({
          where: {
            username: credentials.username as string,
          }
        })

        if (user && user.password !== credentials.password) {
          return null
        }

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: credentials.username as string,
              password: credentials.password as string,
            },
          })
        }

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    }
  }
})
