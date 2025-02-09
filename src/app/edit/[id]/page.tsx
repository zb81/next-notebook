import NoteEditor from '@/components/note-editor'
import prisma from '@/lib/prisma'
import React from 'react'
import { ParamsProps } from '~/index'

export default async function Page({ params }: ParamsProps<{ id: string }>) {
  const { id } = await params
  const note = await prisma.note.findUnique({
    where: { id },
  })
  if (!note) {
    return null
  }

  return (
    <NoteEditor
      id={id}
      defaultValues={{ title: note.title, content: note.content }}
    />
  )
}
