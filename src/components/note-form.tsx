'use client'

import { saveNote } from '@/actions/note'
import { useMessages, useTranslations } from 'next-intl'
import React, { useTransition } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NoteFormSchema, noteFormSchema } from '@/lib/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { useRouter } from 'next/navigation'

export default function NoteForm() {
  const t = useTranslations('Edit')
  const message = useMessages()
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<NoteFormSchema>({
    resolver: zodResolver(noteFormSchema(message)),
    defaultValues: {
      title: 'Untitled',
      content: '',
    },
  })

  const onSubmit = (data: NoteFormSchema) => {
    startTransition(async () => {
      const noteId = await saveNote(data)
      if (noteId) {
        router.replace(`/note/${noteId}`)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={pending}>{t('save')}</Button>
      </form>
    </Form>
  )
}
