import React, { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import NoteList from '@/components/note-list';
import NoteListSkeleton from '@/components/note-list/NoteListSkeleton';
import EditButton from '@/components/EditButton';
import Uploader from '@/components/Uploader';

export default function Page() {
  const t = useTranslations('Basic')

  return (
    <div className='container mx-auto'>
      <div className='mb-3 flex items-center gap-3'>
        <EditButton noteId={null}>
          <Plus />
          {t('newNote')}
        </EditButton>
        <SessionProvider>
          <Uploader />
        </SessionProvider>
      </div>

      <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3'>
        <Suspense fallback={<NoteListSkeleton />}>
          <NoteList />
        </Suspense>
      </div>
    </div>
  )
}
