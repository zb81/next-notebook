'use client'

import { Note } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface Props {
  notes: Array<Note & { updatedAtStr: string }>
}

export default function NoteListFilter({ notes }: Props) {
  const params = useSearchParams()
  const q = params.get('q')

  if (q) {
    notes = notes.filter(n => n.title.toLowerCase().includes(q.toLowerCase()))
  }

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id} className="cursor-pointer mb-3">
          <Card className="hover:border-primary">
            <CardHeader className="p-4">
              <CardTitle
                className="text-nowrap text-xl text-ellipsis overflow-hidden"
                title={note.title}
              >
                {note.title}
              </CardTitle>
              <CardDescription>{note.updatedAtStr}</CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  )
}
