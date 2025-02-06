'use client'

import React, { useState, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { checkCodeAndSignUp, validateEmailAndSendCode } from '@/actions/auth'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchema, signUpFormSchema } from '@/lib/zod'
import { useMessages, useTranslations } from 'next-intl'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import InputPassword from '../ui/input-password'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useToast } from '@/hooks/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignUpForm() {
  const [pending, startTransition] = useTransition()
  const t = useTranslations('Auth')
  const messages = useMessages()
  const { toast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema(messages)),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onNextStep = (data: SignUpFormSchema) => {
    startTransition(async () => {
      const valid = await validateEmailAndSendCode(data)
      if (valid) {
        setStep(2)
        toast({
          title: '提示',
          description: '验证码已发送，请查收。',
        })
      } else {
        form.setError('email', {
          type: 'disabled',
          message: '该邮箱已被注册',
        })
      }
    })
  }

  const onVerifyCode = (code: string) => {
    startTransition(async () => {
      const res = await checkCodeAndSignUp({ ...form.getValues(), code })
      if (res) {
        // 注册成功，跳转到登录页
        await signIn('credentials', {
          redirect: false,
          ...form.getValues(),
        })
        const cbUrl = searchParams.get('callbackUrl')
        if (typeof cbUrl === 'string') {
          router.replace(cbUrl.replace(location.origin, ''))
        } else {
          router.replace('/')
        }
      }
    })
  }

  if (step === 1) {
    return (
      <Form {...form}>
        <form
          autoComplete="off"
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onNextStep)}
        >
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
          <Button disabled={pending}>{t('next')}</Button>
        </form>
      </Form>
    )
  }

  if (step === 2) {
    return (
      <div>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          disabled={pending}
          onComplete={onVerifyCode}
        >
          <InputOTPGroup className="w-full">
            {[0, 1, 2, 3, 4, 5].map(index => (
              <InputOTPSlot
                key={index}
                className="w-[60px] h-[60px]"
                index={index}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <p className="text-center mt-4 text-sm">
          {pending ? '请等待' : '请输入验证码'}
        </p>
      </div>
    )
  }
  return null
}
