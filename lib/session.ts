import { auth } from "@/auth"
import prisma from "./prisma"
import { cookies } from "next/headers"
import { defaultLocale } from "@/i18n/config"
import { redirect } from "@/i18n/routing"

export async function getSessionUserId() {
  const c = await cookies()
  const locale = c.get('NEXT_LOCALE')?.value || defaultLocale

  const session = await auth()

  if (!session?.user) {
    return redirect({ href: `/login`, locale })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string }
  })

  if (!user) {
    return redirect({ href: `/login`, locale })
  }

  return user.id
}
