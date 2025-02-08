import React from 'react'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { codeToHtml } from 'shiki'

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
    span: ['style'],
  },
)

export default async function NotePreview({ content }: { content: string }) {
  marked.use({
    async: true,
    async walkTokens(token) {
      if (token.type === 'code') {
        const html = await codeToHtml(token.text, {
          lang: token.lang || 'text',
          theme: 'vitesse-dark',
        })
        Object.assign(token, {
          type: 'html',
          block: true,
          text: html,
        })
      }
    },
  })

  const htmlStr = await marked(content, { async: true })

  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(htmlStr, { allowedTags, allowedAttributes }),
      }}
    ></div>
  )
}
