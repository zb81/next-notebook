'use client'

import React, { useCallback, useState } from 'react'
import NoteForm from './note-form'
import { NoteFormSchema } from '@/lib/zod'
import NotePreviewClient from './note-preview-client'

interface Props {
  defaultValues: NoteFormSchema
}

export default function NoteEditor({ defaultValues }: Props) {
  const [formData, setFormData] = useState<NoteFormSchema>(defaultValues)

  const onChange = useCallback((values: NoteFormSchema) => {
    setFormData(values)
  }, [])

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-3.5rem)]">
      <NoteForm defaultValues={defaultValues} onChange={onChange} />

      <div className="px-3 py-2 break-all overflow-auto">
        <h1 className="text-center">{formData.title}</h1>
        <NotePreviewClient content={formData.content} />
      </div>
    </div>
  )
}
