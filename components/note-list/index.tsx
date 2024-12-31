import prisma from '@/lib/prisma'
import NoteItem from './NoteItem'
import { getSessionUserId } from '@/lib/session'

export default async function NoteList() {
  const userId = await getSessionUserId()

  const notes = await prisma.note.findMany({
    where: { authorId: userId },
    orderBy: { updatedAt: 'desc' }
  })

  return notes.map(n => <NoteItem key={n.id} note={n} />)
}
