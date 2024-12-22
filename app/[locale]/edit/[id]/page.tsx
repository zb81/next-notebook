import Editor from "@/components/editor"
import prisma from "@/lib/prisma"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const id = (await params).id
  const note = await prisma.note.findUnique({ where: { id } })
  const t = await getTranslations('Basic')


  if (!note) {
    return { title: 'Next Notebook' }
  }

  return {
    title: `${t('edit')} - ${note.title} - Next Notebook`,
  }
}

export default async function Page({ params }: PageProps) {
  const id = (await params).id

  const note = await prisma.note.findUnique({
    where: { id }
  })

  if (!note) {
    return 'Note not found'
  }

  return (
    <div className="h-screen">
      <Editor
        noteId={note.id}
        initialTitle={note.title}
        initialContent={note.content}
      />
    </div>
  )
}
