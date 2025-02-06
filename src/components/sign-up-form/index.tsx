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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useToast } from '@/hooks/use-toast'

export default function SignUpForm() {
  const [pending, startTransition] = useTransition()
  const t = useTranslations('SignUpForm')
  const messages = useMessages()
  const { toast } = useToast()

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
          redirectTo: '/',
          ...form.getValues(),
        })
      }
    })
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <Card className="-mt-20">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="w-[400px] flex flex-col gap-4">
          {step === 1 ? (
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
                <Button disabled={pending}>下一步</Button>
              </form>
            </Form>
          ) : null}

          {step === 2 ? (
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
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
