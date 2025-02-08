import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import React from 'react'
import { ParamsProps } from '~/index'

export default async function Page({ params }: ParamsProps<{ id: string }>) {
  const { id } = await params
  const note = await prisma.note.findUnique({
    where: { id },
    include: { author: true },
  })

  if (!note) {
    return null
  }

  return (
    <div className="prose dark:prose-invert mx-auto">
      <h1 className="text-center">{note.title}</h1>
      <p className="text-sm text-center">由 {note.author.email} 创建</p>
      <p className="text-sm text-center">
        最后编辑于：{formatDate(note.updatedAt)}
      </p>
      <div>{note.content}</div>
    </div>
  )
}
