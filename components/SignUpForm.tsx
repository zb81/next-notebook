'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useMessages, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { SignUpFormSchema, signUpFormSchema } from "@/lib/zod"
import InputPassword from "./InputPassword"

export default function SignUpForm() {
  const messages = useMessages()
  const t = useTranslations('SignUpForm')

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema(messages)),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  async function onSubmit(data: SignUpFormSchema) {
    await fetch('/api/signup', { method: 'POST', body: JSON.stringify(data) })
    await signIn('credentials', {
      redirectTo: '/',
      login: data.username,
      password: data.password,
    })
  }

  return (
    <Form {...form}>
      <form autoComplete="off" className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('username')}</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input {...field} />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPassword')}</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full'>{t('submit')}</Button>

        <Link href="/login" className="text-center text-sm underline underline-offset-4">
          {t('back')}
        </Link>
      </form>
    </Form>

  )
}
