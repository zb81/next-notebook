'use server'

import { signIn } from "@/auth"
import prisma from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"
import { redirect } from "next/navigation"

export async function saveNote(_: unknown, formData: FormData) {
  let id = formData.get('id') as (string | null)
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const userId = await getSessionUserId()

  if (id) {
    await prisma.note.update({ where: { id }, data: { title, content } })
  } else {
    const note = await prisma.note.create({
      data: { title, content, authorId: userId! },
    })
    id = note.id
  }

  redirect(`/${id}`)
}

export async function deleteNote(_: unknown, formData: FormData) {
  const id = formData.get('id') as string
  await prisma.note.delete({ where: { id } })
  redirect('/')
}

export async function login(_: unknown, formData: FormData) {
  await signIn('credentials', {
    redirect: false,
    ...(Object.fromEntries(formData.entries())),
  })
}
