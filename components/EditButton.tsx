import { PropsWithChildren } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

interface Props extends PropsWithChildren {
  noteId: string | null
}

export default function EditButton({ noteId, children }: Props) {
  const isDraft = noteId === null
  return (
    <Link href={`/edit/${noteId || ''}`}>
      <Button size='sm' variant={isDraft ? 'default' : 'link'}>
        {children}
      </Button>
    </Link>
  )
}
