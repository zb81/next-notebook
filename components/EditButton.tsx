import Link from "next/link"
import { PropsWithChildren } from "react"
import { Button } from "./ui/button"

interface Props extends PropsWithChildren {
  noteId: string | null
}

export default function EditButton({ noteId, children }: Props) {
  const isDraft = noteId === null
  return (
    <Link href={`/edit/${noteId || ''}`}>
      <Button size='sm' variant={isDraft ? 'default' : 'link'} className='ml-2'>
        {children}
      </Button>
    </Link>
  )
}
