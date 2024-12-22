import EditButton from "@/components/EditButton"
import NotePreview from "@/components/NotePreview"
import prisma from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
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

  const t = await getTranslations('Basic');

  if (note === null) {
    return (
      <div>
        {t('welcome')}
      </div>
    )
  }

  const { title, updatedAt, content } = note

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-4 mb-3">
        <small className="text-sm">{t('lastUpdated')} {formatDate(updatedAt)}</small>
        <EditButton noteId={id}>{t('edit')}</EditButton>
      </div>
      <NotePreview title={title} content={content} />
    </div>
  )
}
