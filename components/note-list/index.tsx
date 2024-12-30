import prisma from '@/lib/prisma'
import NoteItem from './NoteItem'

export default async function NoteList() {
  const notes = await prisma.note.findMany({ orderBy: { updatedAt: 'desc' } })

  return notes.map(n => <NoteItem key={n.id} note={n} />)
}
