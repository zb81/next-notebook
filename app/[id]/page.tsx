import EditButton from '@/components/EditButton'
import NotePreview from '@/components/NotePreview'
import prisma from '@/lib/prisma'
import { getSessionUserId } from '@/lib/session'
import { formatDate } from '@/lib/utils'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id
  const note = await prisma.note.findUnique({ where: { id } })

  if (!note) {
    return { title: 'Next Notebook' }
  }

  return {
    title: `${note.title}`,
  }
}

export default async function Page({ params }: PageProps) {
  const userId = await getSessionUserId()
  const id = (await params).id

  const note = await prisma.note.findUnique({
    where: { id, authorId: userId },
  })

  const t = await getTranslations('Basic')

  if (note === null) {
    return <div className="text-center">{t('noteNotFound')}</div>
  }

  const { title, updatedAt, content } = note

  return (
    <div>
      <h1 className="text-center text-4xl mb-4 font-bold">{title}</h1>
      <div className="flex justify-center items-center gap-4 mb-4">
        <small className="text-sm">
          {t('lastUpdated')} {formatDate(updatedAt)}
        </small>
        <EditButton noteId={id}>{t('edit')}</EditButton>
      </div>
      <NotePreview content={content} />
    </div>
  )
}
