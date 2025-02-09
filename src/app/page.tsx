import { auth } from '@/auth'
import NoteItem from '@/components/note-item'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

export default async function Home() {
  const notes = await prisma.note.findMany({
    include: { author: true },
    orderBy: { updatedAt: 'desc' },
  })

  const session = await auth()

  const isLoggedIn = !!session?.user?.id

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="mt-2 mb-4">
          <Link href="/edit">
            <Button>New</Button>
          </Link>
        </div>
      ) : null}

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map(note => (
          <li key={note.id}>
            <NoteItem
              note={note}
              personal={session?.user?.id === note.authorId}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
