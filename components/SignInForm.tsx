'use client'

import Link from 'next/link'
import { useMessages, useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { signInFormSchema, SignInFormSchema } from '@/lib/zod'
import InputPassword from './InputPassword'

export default function SignInForm() {
  const messages = useMessages()
  const t = useTranslations('SignInForm')
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const code = searchParams.get('code')
  const hasError = error === 'CredentialsSignin' && code === 'invalid_credentials'

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema(messages)),
    mode: 'onSubmit',
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  function onSubmit(data: SignInFormSchema) {
    if (!isPending) {
      startTransition(async () => {
        await signIn('credentials', {
          ...data,
          redirectTo: '/',
        })
      })
    }
  }

  return (
    <Form {...form}>
      <form className='flex flex-col gap-5' onChange={() => {
        if (hasError)
          router.replace(pathname)
      }} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('identifier')}</FormLabel>
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

        {isPending ? (
          <p className='text-center text-sm'>{t('pending')}</p>
        ) : (
          <>
            {hasError ? <p className='text-red-500 text-sm'>{t(code)}</p> : null}
            <Button className='w-full'>{t('signIn')}</Button>
            <Link className='text-center text-sm underline underline-offset-4' href="/signup">
              {t('signUp')}
            </Link>
          </>
        )}
      </form>
    </Form>
  )
}
