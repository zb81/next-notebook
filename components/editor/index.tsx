'use client'

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { saveNote } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import SaveButton from "../SaveButton";
import { Button } from "../ui/button";

interface Props {
  noteId: string | null
  initialTitle: string
  initialContent: string
}

export default function Editor({ noteId, initialTitle, initialContent }: Props) {
  const [, saveAction] = useActionState(saveNote, null)
  const isDraft = !noteId

  return (
    <Allotment>
      <Allotment.Pane className="p-4" minSize={240}>
        {!isDraft && <Button>删除</Button>}
        <form autoComplete="off">
          <Input defaultValue={initialTitle} name="title" />
          <Textarea defaultValue={initialContent} name="content" />
          <SaveButton formAction={saveAction} />
        </form>
      </Allotment.Pane>
      <Allotment.Pane className="p-4">
        Preview
      </Allotment.Pane>
    </Allotment>
  )
}
