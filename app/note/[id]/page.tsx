import NotePreview from "@/components/NotePreview"
import prisma from "@/lib/prisma"

interface PageProps {
  params: Promise<{ id: string }>
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
