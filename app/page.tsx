import React, { Suspense } from 'react'

import NoteList from '@/components/note-list';
import NoteListSkeleton from '@/components/note-list/NoteListSkeleton';
import EditButton from '@/components/EditButton';
import { Plus } from 'lucide-react';
import Uploader from '@/components/Uploader';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic'

export default async function Page() {
  const t = await getTranslations('Basic')

  return (
    <div className='container mx-auto'>
      <div className='mb-3 flex items-center gap-3'>
        <EditButton noteId={null}>
          <Plus />
          {t('newNote')}
        </EditButton>
        <Uploader />
      </div>
      <Suspense fallback={<NoteListSkeleton />}>
        <NoteList />
      </Suspense>
    </div>
  )
}
