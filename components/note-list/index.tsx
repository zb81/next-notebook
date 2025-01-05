import prisma from '@/lib/prisma'
import NoteItem from './NoteItem'
import { getSessionUserId } from '@/lib/session'
import { getTranslations } from 'next-intl/server'

export default async function NoteList() {
  const t = await getTranslations('Basic')
  const userId = await getSessionUserId()

  const notes = await prisma.note.findMany({
    where: { authorId: userId },
    orderBy: { updatedAt: 'desc' }
  })

  if (notes.length === 0) {
    return <div>{t('empty')}</div>
  }

  return (
    <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3'>
      {notes.map(n => <NoteItem key={n.id} note={n} />)}
    </div>
  )
}
