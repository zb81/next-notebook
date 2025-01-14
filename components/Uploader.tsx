'use client'

import React, { useActionState, useRef } from 'react'
import { useTranslations } from 'next-intl'

import { uploadNote } from '@/actions/note'
import { useSession } from 'next-auth/react'

export default function Uploader() {
  const t = useTranslations('Basic')
  const formRef = useRef<HTMLFormElement>(null)
  const session = useSession()
  const [uploadState, uploadAction, pending] = useActionState(uploadNote, null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      return
    }
    formRef.current?.requestSubmit()
  }

  return pending ? (
    t('uploading')
  ) : (
    <form ref={formRef} action={uploadAction}>
      <input name="userId" hidden defaultValue={session.data?.user?.id} />
      <input name="errorMessage" hidden defaultValue={t('uploadFailed')} />
      <input
        name="file"
        accept=".md,.txt"
        type="file"
        id="upload"
        hidden
        onChange={handleChange}
      />
      <label
        htmlFor="upload"
        className="cursor-pointer text-sm underline underline-offset-2"
      >
        {t('upload')}
      </label>
      <span className="text-red-500 text-sm ml-4">{uploadState?.error}</span>
    </form>
  )
}
