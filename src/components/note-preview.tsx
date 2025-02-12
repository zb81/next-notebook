import React from 'react'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { codeToHtml } from 'shiki'
import { allowedAttributes, allowedTags } from '@/lib/sanitize'

interface TOC {
  anchor: string
  level: number
  text: string
}

export default async function NotePreview({ content }: { content: string }) {
  const toc: TOC[] = []

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
    renderer: {
      heading({ text, depth, raw }) {
        const anchor = encodeURIComponent(
          raw.toLowerCase().replace(/[\s#]/g, '-'),
        )
        toc.push({
          anchor,
          level: depth,
          text,
        })
        return `<h${depth} style="padding-top: 3.5rem; margin-top: -3.5rem;" id=${anchor}>${text}</h${depth}>`
      },
    },
  })

  const htmlStr = await marked(content, { async: true })

  const minLevel = Math.min(...toc.map(({ level }) => level))

  return (
    <div className="flex gap-4">
      <div
        className="prose dark:prose-invert pb-14"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(htmlStr, { allowedTags, allowedAttributes }),
        }}
      ></div>

      <ul className="list-none text-sm m-0 p-0 w-[300px] hidden lg:block">
        {toc.map(({ anchor, level, text }, index) => (
          <li key={index}>
            <a
              href={`#${anchor}`}
              className="no-underline inline-block w-full hover:underline truncate"
              style={{ paddingLeft: `${level - minLevel}rem` }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
