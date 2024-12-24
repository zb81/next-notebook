'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

export default function Uploader() {
  const t = useTranslations('Basic')
  const router = useRouter()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      return
    }

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
        throw new Error('Upload failed')
      }

      const data = await res.json()
      router.push(`/${data.id}`)
    } catch (e) {
      console.error('Upload failed', e);
    }
  }

  return (
    <form>
      <input name='file' accept='.md' type="file" hidden id="upload" onChange={handleChange} />
      <label htmlFor="upload" className='cursor-pointer text-sm underline underline-offset-2'>
        {t('upload')}
      </label>
    </form>
  )
}
