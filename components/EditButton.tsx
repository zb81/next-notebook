import Link from "next/link"
import { PropsWithChildren } from "react"
import { Button } from "./ui/button"

interface Props extends PropsWithChildren {
  noteId: string | null
}

export default function EditButton({ noteId, children }: Props) {
  return (
    <Link href={`/note/edit/${noteId || ''}`}>
      <Button size='sm' className='ml-2'>
        {children}
      </Button>
    </Link>
  )
}
