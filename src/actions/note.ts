'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { NoteFormSchema } from '@/lib/zod'

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
