import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Note, User } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import DeleteButton from './delete-button'

interface Props {
  note: Note & { author: User }
  personal: boolean
}

export default function NoteItem({ note, personal }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 flex justify-between">
          <Link
            href={`/note/${note.id}`}
            className="underline underline-offset-4"
          >
            <h2>{note.title}</h2>
          </Link>

          {personal ? (
            <div className="flex gap-3">
              <Link href={`/edit/${note.id}`} title="编辑">
                <Edit size={16} />
              </Link>

              <DeleteButton id={note.id} />
            </div>
          ) : null}
        </CardTitle>
        <CardDescription>由 {note.author.email} 创建</CardDescription>
        <CardDescription>
          最后编辑于：{formatDate(note.updatedAt)}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
