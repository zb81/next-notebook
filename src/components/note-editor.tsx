'use client'

import React, { useCallback, useState } from 'react'
import NoteForm from './note-form'
import { NoteFormSchema } from '@/lib/zod'
import NotePreviewClient from './note-preview-client'

interface Props {
  defaultValues: NoteFormSchema
  id?: string
}

export default function NoteEditor({ defaultValues, id }: Props) {
  const [formData, setFormData] = useState<NoteFormSchema>(defaultValues)

  const onChange = useCallback((values: NoteFormSchema) => {
    setFormData(values)
  }, [])

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-3.5rem)]">
      <NoteForm id={id} defaultValues={defaultValues} onChange={onChange} />

      <div className="px-3 py-2 break-all overflow-auto">
        <NotePreviewClient content={formData.content} />
      </div>
    </div>
  )
}
