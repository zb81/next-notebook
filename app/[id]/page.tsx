import NotePreview from "@/components/NotePreview"
import prisma from "@/lib/prisma"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const id = (await params).id
  const note = await prisma.note.findUnique({ where: { id } })

  if (!note) {
    return { title: 'Next Notebook' }
  }

  return {
    title: `${note.title} - Next Notebook`,
  }
}

export default async function Page({ params }: PageProps) {
  const id = (await params).id

  const note = await prisma.note.findUnique({
    where: { id }
  })

  if (note === null) {
    return (
      <div>
        Click a note on the left to view something! 🥺
      </div>
    )
  }

  return <NotePreview note={note} />
}
