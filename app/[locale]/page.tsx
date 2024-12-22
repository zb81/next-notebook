import { useTranslations } from 'next-intl';
import React from 'react'

export default function Page() {
  const t = useTranslations('Basic');

  return (
    <div className='h-screen flex justify-center items-center text-xl'>
      {t('welcome')}
    </div>
  )
}
