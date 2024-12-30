import { Link } from '@/i18n/routing'
import { Note } from '@prisma/client'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { formatDate } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export default async function NoteItem({ note }: { note: Note }) {
  const t = await getTranslations('Basic')

  return (
    <Link href={`/${note.id}`} title={note.title}>
      <Card className="hover:border-primary mb-3">
        <CardHeader className="p-4">
          <CardTitle className="truncate">{note.title}</CardTitle>
          <CardDescription>{t('lastUpdated')}{' '}{formatDate(note.updatedAt)}</CardDescription>
          <CardDescription className='line-clamp-3'>{note.content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
