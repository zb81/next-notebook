import { NoteFormSchema } from '@/lib/zod'
import React from 'react'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img'])
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src'],
    h1: ['id', 'style'],
    h2: ['id', 'style'],
    h3: ['id', 'style'],
    h4: ['id', 'style'],
    h5: ['id', 'style'],
    h6: ['id', 'style'],
  },
)

export default function NotePreview({ title, content }: NoteFormSchema) {
  const htmlStr = marked(content, { async: false })

  return (
    <div className="prose dark:prose-invert">
      <h1>{title}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(htmlStr, { allowedTags, allowedAttributes }),
        }}
      ></div>
    </div>
  )
}
