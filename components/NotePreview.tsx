import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

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

interface Props {
  title: string
  content: string
}

export default function NotePreview({ title, content }: Props) {
  return (
    <div className='mx-auto prose break-words text-foreground prose-headings:text-foreground'>
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(content, { async: false }), { allowedTags, allowedAttributes })
        }}
      >
      </div>
    </div>
  )
}
