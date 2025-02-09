import sanitizeHtml from 'sanitize-html'

export const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img'])
export const allowedAttributes = Object.assign(
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
