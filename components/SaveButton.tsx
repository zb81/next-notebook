import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

interface Props {
  formAction: (d: FormData) => void
}

export default function SaveButton({ formAction }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button formAction={formAction} type='submit' disabled={pending}>
      {pending ? 'Saving' : 'Save'}
    </Button>
  )
}
