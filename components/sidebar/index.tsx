import Link from 'next/link'
import React, { Suspense } from 'react'
import NoteList from './NoteList'
import NoteListSkeleton from './NoteListSkeleton'
import { ScrollArea } from '../ui/scroll-area'
import SearchInput from './SearchInput'
import EditButton from '../EditButton'
import { Plus } from 'lucide-react'

export default async function Sidebar() {
  return (
    <div className='fixed h-screen w-[260px] border-r flex flex-col'>
      <div className='py-3 text-center'>
        <Link href="/">
          <h1 className='text-xl font-bold'>Next Notebook</h1>
        </Link>
      </div>

      <div className='px-3 mb-3 flex'>
        <SearchInput />
        <EditButton noteId={null}>
          <Plus />
        </EditButton>
      </div>

      <ScrollArea className="px-3 flex-1">
        <Suspense fallback={<NoteListSkeleton />}>
          <NoteList />
        </Suspense>
      </ScrollArea>
    </div>
  )
}
