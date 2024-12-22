'use client'

import { Allotment } from "allotment";
import "allotment/dist/style.css";

import { deleteNote, saveNote } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
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

  return (
    <Allotment>
      <Allotment.Pane className="p-4">
        <form className="flex h-full flex-col gap-4" autoComplete="off">
          <div className="flex gap-3 flex-wrap">
            {!isDraft && <DeleteButton formAction={deleteAction} />}
            <SaveButton formAction={saveAction} />
          </div>
          {!isDraft && <input type="hidden" name="id" value={noteId} />}
          <Input value={title} name="title" onChange={e => setTitle(e.target.value)} />
          <Textarea className="flex-1 resize-none" value={content} name="content" onChange={e => setContent(e.target.value)} />
        </form>
      </Allotment.Pane>
      <Allotment.Pane>
        <div className="p-4 overflow-x-hidden overflow-y-auto h-full">
          <NotePreview title={title} content={content} />
        </div>
      </Allotment.Pane>
    </Allotment>
  )
}
