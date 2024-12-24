import React, { Suspense } from 'react'
import NoteList from './NoteList'
import NoteListSkeleton from './NoteListSkeleton'
import { ScrollArea } from '../ui/scroll-area'
import SearchInput from './SearchInput'
import EditButton from '../EditButton'
import { Plus } from 'lucide-react'
import { Link } from '@/i18n/routing'
import LocaleSwitcher from './LocaleSwitcher'
import Uploader from './Uploader'
import { getTranslations } from 'next-intl/server'

export default async function Sidebar() {
  const t = await getTranslations('Basic')

  return (
    <div className='fixed inset-y-0 left-0 w-[260px] border-r flex flex-col'>
      <div className='p-3 text-center flex items-center justify-between'>
        <Link href="/">
          <h1 className='text-xl font-bold'>Next Notebook</h1>
        </Link>
        <LocaleSwitcher />
      </div>

      <div className='px-3'>
        <SearchInput />
      </div>

      <div className='px-3 my-2 flex items-center gap-3'>
        <EditButton noteId={null}>
          <Plus />
          {t('newNote')}
        </EditButton>
        <Uploader />
      </div>

      <ScrollArea className="px-2 flex-1">
        <Suspense fallback={<NoteListSkeleton />}>
          <NoteList />
        </Suspense>
      </ScrollArea>
    </div>
  )
}
