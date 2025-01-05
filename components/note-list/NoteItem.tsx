import { Note } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { formatDate } from '@/lib/utils'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'

export default async function NoteItem({ note }: { note: Note }) {
  const t = await getTranslations('Basic')

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="truncate">
          <Link
            className='overflow-hidden hover:underline underline-offset-2'
            href={`/${note.id}`} title={note.title}
          >
            {note.title}
          </Link>
        </CardTitle>
        <CardDescription className='flex items-center justify-between'>
          <span>{t('lastUpdated')}{' '}{formatDate(note.updatedAt)}</span>
          <div>
            <EditButton noteId={note.id} />
            <DeleteButton noteId={note.id} />
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className='line-clamp-3'>{note.content}</p>
      </CardContent>
    </Card>
  )
}
