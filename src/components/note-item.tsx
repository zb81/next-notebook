import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Note, User } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Edit } from 'lucide-react'

export default function NoteItem({ note }: { note: Note & { author: User } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{note.title}</h2>
        </CardTitle>
        <CardDescription>由 {note.author.email} 创建</CardDescription>
        <CardDescription>
          <span>最后编辑于：{formatDate(note.updatedAt)}</span>
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Link href={`/edit/${note.id}`} title="编辑">
          <Edit size={16} />
        </Link>
      </CardFooter>
    </Card>
  )
}
