'use server'

import { defaultLocale } from "@/i18n/config"
import { redirect } from "@/i18n/routing"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

async function getLocale() {
  const c = await cookies()
  return c.get('NEXT_LOCALE')?.value || defaultLocale
}

export async function saveNote(_: unknown, formData: FormData) {
  let id = formData.get('id') as (string | null)
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (id) {
    await prisma.note.update({ where: { id }, data: { title, content } })
  } else {
    const note = await prisma.note.create({
      data: { title, content }
    })
    id = note.id
  }

  const locale = await getLocale()

  redirect({ href: `/${id}`, locale })
}

export async function deleteNote(_: unknown, formData: FormData) {
  const id = formData.get('id') as string
  await prisma.note.delete({ where: { id } })
  const locale = await getLocale()
  redirect({ href: '/', locale })
}
