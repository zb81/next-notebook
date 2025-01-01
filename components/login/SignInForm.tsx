'use client'

import { useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SignInForm() {
  const t = useTranslations('Login')

  return (
    <form className='flex flex-col gap-4'>
      <Label htmlFor='username'>{t('username')}</Label>
      <Input id='username' name='username' />

      <Label htmlFor='password'>{t('password')}</Label>
      <Input id='password' type="password" name='password' />

      <Button className='w-full' formAction={(formData) => {
        signIn('credentials', {
          redirectTo: '/',
          username: formData.get('username'),
          password: formData.get('password'),
        })
      }}>{t('signIn')}</Button>

      <Button variant='link' onClick={() => console.log('123123')}>{t('signUp')}</Button>
    </form>
  )
}
