'use client'

import { useMessages, useTranslations } from 'next-intl'
import { signInFormSchema, SignInFormSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import InputPassword from './ui/input-password'
import { Button } from './ui/button'
import { useState, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function SignInForm() {
  const messages = useMessages()
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema(messages)),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const t = useTranslations('Auth')

  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string>()
  const { toast } = useToast()

  const onSubmit = (data: SignInFormSchema) => {
    startTransition(async () => {
      const res = await signIn('credentials', {
        redirect: false,
        ...data,
      })
      if (res?.code) {
        setError(res.code)
      } else {
        toast({
          title: '提示',
          description: '登录成功，欢迎！',
        })
        const cbUrl = searchParams.get('callbackUrl')
        if (typeof cbUrl === 'string' && cbUrl.startsWith(location.origin)) {
          router.replace(cbUrl.replace(location.origin, ''))
        } else {
          router.replace('/')
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-destructive text-sm">{t(error)}</p>}
        <Button disabled={pending}>{t('signIn')}</Button>
      </form>
    </Form>
  )
}
