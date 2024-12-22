'use client'

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { saveNote } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
import SaveButton from "../SaveButton";
import { Button } from "../ui/button";
import NotePreview from "../NotePreview";

interface Props {
  noteId: string | null
  initialTitle: string
  initialContent: string
}

export default function Editor({ noteId, initialTitle, initialContent }: Props) {
  const [, saveAction] = useActionState(saveNote, null)
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const isDraft = !noteId

  return (
    <Allotment>
      <Allotment.Pane className="p-4">
        {!isDraft && <Button>删除</Button>}
        <form className="flex h-full flex-col gap-4" autoComplete="off">
          <Input value={title} name="title" onChange={e => setTitle(e.target.value)} />
          <Textarea className="flex-1 resize-none" value={content} name="content" onChange={e => setContent(e.target.value)} />
          <SaveButton formAction={saveAction} />
        </form>
      </Allotment.Pane>
      <Allotment.Pane className="p-4">
        <NotePreview title={title} content={content} />
      </Allotment.Pane>
    </Allotment>
  )
}
