'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { AbstractIntlMessages, useMessages, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ComponentProps, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from 'next-auth/react'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

function createFormSchema(messages: AbstractIntlMessages) {
  const m = messages['Rules'] as Record<string, string>

  return z.object({
    username: z.string().min(2, { message: m['usernameMin'] }).max(12, { message: m['usernameMax'] }),
    email: z.string().email({ message: m['email'] }),
    password: z.string().min(6, { message: m['passwordMin'] }).max(18, { message: m['passwordMax'] }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: m['confirmPassword'],
    path: ['confirmPassword'],
  })
}

type FormSchema = z.infer<ReturnType<typeof createFormSchema>>


function InputPassword(props: ComponentProps<typeof Input>) {
  const [isView, setIsView] = useState(false)

  return (
    <div className="relative">
      <Input type={isView ? 'text' : 'password'} {...props} />
      <div className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2">
        {
          isView
            ? <EyeOff size={16} onClick={() => setIsView(false)} />
            : <Eye size={16} onClick={() => setIsView(true)} />
        }
      </div>
    </div>
  )
}

export default function SignUpForm() {
  const messages = useMessages()

  const tf = useTranslations('Form')
  const ts = useTranslations('SignUp')

  const form = useForm<FormSchema>({
    resolver: zodResolver(createFormSchema(messages)),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  async function onSubmit(data: FormSchema) {
    await fetch('/api/signup', { method: 'POST', body: JSON.stringify(data) })
    await signIn('credentials', {
      redirectTo: '/',
      login: data.username,
      password: data.password,
    })
  }

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tf('username')}</FormLabel>
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
              <FormLabel>{tf('email')}</FormLabel>
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
              <FormLabel>{tf('password')}</FormLabel>
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
              <FormLabel>{tf('confirmPassword')}</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full'>{ts('submit')}</Button>

        <Link href="/login">
          <Button className='w-full' variant='link'>{ts('back')}</Button>
        </Link>
      </form>
    </Form>

  )
}
