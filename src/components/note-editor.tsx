'use client'

import React, { useCallback, useState } from 'react'
import NoteForm from './note-form'
import NotePreview from './note-preview'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable'
import { NoteFormSchema } from '@/lib/zod'

interface Props {
  defaultValues: NoteFormSchema
}

export default function NoteEditor({ defaultValues }: Props) {
  const [formData, setFormData] = useState<NoteFormSchema>(defaultValues)

  const onChange = useCallback((values: NoteFormSchema) => {
    setFormData(values)
  }, [])

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="p-2">
        <NoteForm defaultValues={defaultValues} onChange={onChange} />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel className="p-2">
        <NotePreview {...formData} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
