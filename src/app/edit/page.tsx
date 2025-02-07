import NoteEditor from '@/components/note-editor'
import React from 'react'

export default async function Page() {
  return <NoteEditor defaultValues={{ title: 'Untitled', content: '' }} />
}
