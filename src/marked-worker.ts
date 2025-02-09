import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { codeToHtml } from 'shiki'
import { allowedAttributes, allowedTags } from '@/lib/sanitize'

marked.use({
  async: true,
  async walkTokens(token) {
    if (token.type === 'code') {
      try {
        const html = await codeToHtml(token.text, {
          lang: token.lang || 'text',
          theme: 'vitesse-dark',
        })
        Object.assign(token, {
          type: 'html',
          block: true,
          text: html,
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
})

self.onmessage = async e => {
  const htmlStr = await marked(e.data, { async: true })
  const html = sanitizeHtml(htmlStr, { allowedTags, allowedAttributes })
  self.postMessage(html)
}
