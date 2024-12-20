'use client'

import { saveNote } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import SaveButton from "../SaveButton";

export default function Editor() {
  const [, saveAction] = useActionState(saveNote, null)

  return (
    <form autoComplete="off">
      <Input name="title" />
      <Textarea name="content" />
      <SaveButton formAction={saveAction} />
    </form>
  )
}
