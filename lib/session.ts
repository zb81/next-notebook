import { redirect } from "next/navigation"

import { auth } from "@/auth"
import prisma from "./prisma"

export async function getSessionUserId() {
  const session = await auth()

  if (!session?.user) {
    return redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string }
  })

  if (!user) {
    return redirect('/login')
  }

  return user.id
}
