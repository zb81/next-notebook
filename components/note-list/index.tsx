import prisma from '@/lib/prisma'
import NoteItem from './NoteItem'
import { getSessionUserId } from '@/lib/session'
import { getTranslations } from 'next-intl/server'
import { sleep } from '@/lib/utils'

export default async function NoteList() {
  await sleep(500)
  const t = await getTranslations('Basic')
  const userId = await getSessionUserId()

  const notes = await prisma.note.findMany({
    where: { authorId: userId },
    orderBy: { updatedAt: 'desc' },
  })

  if (notes.length === 0) {
    return <div>{t('empty')}</div>
  }

  return notes.map(n => <NoteItem key={n.id} note={n} />)
}
