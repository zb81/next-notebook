import { formatDate } from "@/lib/utils";
import { Note } from "@prisma/client";
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import EditButton from "./EditButton";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3'
])
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src']
  }
)

export default function NotePreview({ note }: { note: Note }) {
  const { id, title, updatedAt, content } = note
  return (
    <div className="p-4 prose text-foreground prose-headings:text-foreground">
      <h1>{title}</h1>
      <div>
        <small>最后更新于 {formatDate(updatedAt)}</small>

        <EditButton noteId={id}>编辑</EditButton>
      </div>
      <div dangerouslySetInnerHTML={{
        __html: sanitizeHtml(marked(content, { async: false }), { allowedTags, allowedAttributes })
      }}></div>
    </div>
  )
}
