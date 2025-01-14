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
  }
)

interface Props {
  content: string
  showToc?: boolean
}

interface TOC {
  anchor: string
  level: number
  text: string
}

const renderer = new marked.Renderer()

export default function NotePreview({ content, showToc = true }: Props) {
  const toc: TOC[] = []

  renderer.heading = function ({ text, depth, raw }) {
    const anchor = encodeURIComponent(raw.toLowerCase().replace(/[\s#]/g, '-'))
    toc.push({
      anchor,
      level: depth,
      text,
    })
    return `<h${depth} style="padding-top: 3.5rem; margin-top: -3.5rem;" id=${anchor}>${text}</h${depth}>`
  }

  marked.setOptions({
    renderer,
  })

  const htmlStr = marked(content, { async: false })

  const minLevel = Math.min(...toc.map(({ level }) => level))

  return (
    <div>
      <div
        className="prose dark:prose-invert break-words mx-auto pb-8"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(htmlStr, { allowedTags, allowedAttributes }),
        }}
      ></div>

      {showToc ? (
        <ul className="list-none text-sm m-0 p-0 fixed w-[300px] top-[100px] right-[300px]">
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
      ) : null}
    </div>
  )
}
