import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { useTranslations } from 'next-intl'

interface Props {
  formAction: (d: FormData) => void
}

export default function SaveButton({ formAction }: Props) {
  const { pending } = useFormStatus()

  const t = useTranslations('Basic');

  return (
    <Button size='sm' formAction={formAction} type='submit' disabled={pending}>
      {pending ? t('saving') : t('save')}
    </Button>
  )
}
