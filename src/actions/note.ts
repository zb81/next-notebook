'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { NoteFormSchema } from '@/lib/zod'
import { revalidatePath } from 'next/cache'

export async function saveNote(data: NoteFormSchema) {
  const session = await auth()
  if (session?.user?.id) {
    const { id } = await prisma.note.create({
      data: {
        content: data.content,
        title: data.title,
        authorId: session.user.id,
      },
      include: {
        author: true,
      },
    })

    return id
  }
}

export async function deleteNote(id: string) {
  await prisma.note.delete({ where: { id } })
  revalidatePath('/')
}
