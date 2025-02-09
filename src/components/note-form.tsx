'use client'

import { saveNote } from '@/actions/note'
import { useMessages, useTranslations } from 'next-intl'
import React, { memo, useEffect, useRef, useTransition } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NoteFormSchema, noteFormSchema } from '@/lib/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { useRouter } from 'next/navigation'

interface Props {
  defaultValues?: NoteFormSchema
  onChange?: (values: NoteFormSchema) => void
  id?: string
}

export default memo(function NoteForm({ defaultValues, onChange, id }: Props) {
  const t = useTranslations('Edit')
  const message = useMessages()
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<NoteFormSchema>({
    resolver: zodResolver(noteFormSchema(message)),
    defaultValues,
  })
  const formValues = form.watch()

  const onSubmit = (data: NoteFormSchema) => {
    startTransition(async () => {
      const noteId = await saveNote(data, id)
      if (noteId) {
        router.replace(`/note/${noteId}`)
      }
    })
  }

  useEffect(() => {
    onChange?.(formValues)
  }, [formValues, onChange])

  const onFile = () => {
    fileInputRef.current?.click()
  }

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0]
    if (file instanceof File) {
      form.setValue('title', file.name)
      const reader = new FileReader()
      reader.readAsText(file)
      reader.addEventListener('load', () => {
        form.setValue('content', reader.result as string)
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <Button onClick={() => router.back()} variant="outline" type="button">
            返回
          </Button>
          <Button type="button" onClick={onFile}>
            选择文件
          </Button>
          <Button disabled={pending}>{t('save')}</Button>
        </div>

        <input
          ref={fileInputRef}
          accept=".md,.txt"
          type="file"
          hidden
          onChange={onFileChange}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="h-1/2">
              <FormControl>
                <Textarea
                  className="h-[calc(100vh-15rem)] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})
