'use server'

import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { getSessionUserId } from '@/lib/session'
import { Note } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function saveNote(_: unknown, formData: FormData) {
  let id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const userId = await getSessionUserId()

  if (id) {
    await prisma.note.update({ where: { id }, data: { title, content } })
  } else {
    const note = await prisma.note.create({
      data: { title, content, authorId: userId! },
      include: { author: true },
    })
    id = note.id
  }

  redirect(`/${id}`)
}

export async function uploadNote(_: unknown, formData: FormData) {
  const userId = formData.get('userId') as string
  if (!userId) {
    redirect('/sign-in')
  }
  const file = formData.get('file') as File
  const buffer = Buffer.from(await file.arrayBuffer())
  let res: Note | null = null
  try {
    const filename = file.name.replace(/\.[^/.]+$/, '')
    // 调用接口，写入数据库
    res = await prisma.note.create({
      data: {
        title: filename,
        content: buffer.toString('utf-8'),
        authorId: userId,
      },
      include: {
        author: true,
      },
    })
  } catch (e) {
    console.log(e)
    return { error: formData.get('errorMessage') as string }
  }

  if (res) {
    redirect(`/${res.id}`)
  }
}

export async function deleteNote(noteId: string) {
  await prisma.note.delete({ where: { id: noteId } })
  revalidatePath('/')
}
