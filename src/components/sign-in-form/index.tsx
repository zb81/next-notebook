'use client'

import { useMessages, useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { signInFormSchema, SignInFormSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'

export default function SignInForm() {
  const t = useTranslations('SignInForm')
  const messages = useMessages()
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema(messages)),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <Card className="-mt-20">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="w-[400px] flex flex-col gap-4">
          <Form {...form}>
            <form></form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
