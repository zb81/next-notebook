import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

interface Props {
  formAction: (d: FormData) => void
}

export default function DeleteButton({ formAction }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      size='sm' formAction={formAction}
      type='submit' disabled={pending}
      variant='destructive'
    >
      {pending ? 'Deleting' : 'Delete'}
    </Button>
  )
}
