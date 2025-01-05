import { PropsWithChildren } from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import { Edit } from "lucide-react"

interface Props extends PropsWithChildren {
  noteId: string | null
}

export default function EditButton({ noteId, children }: Props) {
  const isDraft = noteId === null
  return (
    isDraft
      ? (
        <Link href='/edit'>
          <Button size='sm' variant={isDraft ? 'default' : 'link'}>
            {children}
          </Button>
        </Link>
      )
      : (
        <Link href={`/edit/${noteId}`}>
          <Button size='icon' variant='ghost'>
            <Edit />
          </Button>
        </Link>
      )
  )
}
