import EditButton from "@/components/EditButton"
import NotePreview from "@/components/NotePreview"
import prisma from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
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

  const { title, updatedAt, content } = note

  return (
    <div className="p-4">
      <div>
        <small>最后更新于 {formatDate(updatedAt)}</small>
        <EditButton noteId={id}>编辑</EditButton>
      </div>
      <NotePreview title={title} content={content} />
    </div>
  )
}
