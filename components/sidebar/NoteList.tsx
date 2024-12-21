import prisma from "@/lib/prisma"
import NoteListFilter from "./NoteListFilter"
import { formatDate } from "@/lib/utils"

export default async function NoteList() {
  const notes = await prisma.note.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <NoteListFilter
      notes={notes.map(n => ({
        ...n,
        updatedAtStr: formatDate(n.updatedAt)
      }))}
    />
  )
}
