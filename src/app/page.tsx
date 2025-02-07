import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default async function Home() {
  const notes = await prisma.note.findMany({
    skip: 0,
    take: 10,
  })

  return (
    <div>
      <Link href="/edit">
        <Button>New</Button>
      </Link>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{formatDate(note.updatedAt)}</p>
            <Link href={`/edit/${note.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
