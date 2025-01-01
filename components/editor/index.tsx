'use client'

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";

import { deleteNote, saveNote } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SaveButton from "../SaveButton";
import NotePreview from "../NotePreview";
import DeleteButton from "../DeleteButton";

interface Props {
  noteId: string | null
  initialTitle: string
  initialContent: string
}

export default function Editor({ noteId, initialTitle, initialContent }: Props) {
  const [, saveAction] = useActionState(saveNote, null)
  const [, deleteAction] = useActionState(deleteNote, null)

  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const isDraft = !noteId

  const t = useTranslations('Basic');

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div>
      <form className="flex h-full flex-col gap-4" autoComplete="off">
        <div className="flex gap-3 flex-wrap">
          {!isDraft && <DeleteButton formAction={deleteAction} />}
          <SaveButton formAction={saveAction} />
        </div>
        {!isDraft && <input type="hidden" name="id" value={noteId} />}
        <Input placeholder={t('title')} value={title} name="title" onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder={t('content')} className="flex-1 resize-none" value={content} name="content" onChange={e => setContent(e.target.value)} />
      </form>
      <div className="p-4 overflow-x-hidden overflow-y-auto h-full">
        <NotePreview title={title} content={content} />
      </div>
    </div>
  )
}
