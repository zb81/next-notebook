import prisma from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"

export default async function NoteList() {
  const notes = await prisma.note.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id} className="cursor-pointer mb-3">
          <ContextMenu>
            <ContextMenuTrigger>
              <Card className="hover:border-primary">
                <CardHeader className="p-4">
                  <CardTitle
                    className="text-nowrap text-xl text-ellipsis overflow-hidden"
                    title={note.title}
                  >
                    {note.title}
                  </CardTitle>
                  <CardDescription>{formatDate(note.updatedAt)}</CardDescription>
                </CardHeader>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem className="focus:bg-destructive focus:text-destructive-foreground">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </li>
      ))}
    </ul>
  )
}
