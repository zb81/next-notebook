'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function NotePreview({ content }: { content: string }) {
  const workerRef = useRef<Worker>(null)
  const [htmlStr, setHtmlStr] = useState('')

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../marked-worker.ts', import.meta.url),
    )
    workerRef.current.onmessage = e => {
      setHtmlStr(e.data)
    }
  }, [])

  useEffect(() => {
    workerRef.current?.postMessage(content)
  }, [content])

  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{
        __html: htmlStr,
      }}
    ></div>
  )
}
