import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signIn } from '@/auth'

export default function LoginForm() {
  const tl = useTranslations('Login')
  const tf = useTranslations('Form')

  return (
    <form className='flex flex-col gap-4'>
      <Label htmlFor='login'>{tf('login')}</Label>
      <Input autoFocus id='login' name='login' />

      <Label htmlFor='password'>{tf('password')}</Label>
      <Input id='password' type="password" name='password' />

      <Button className='w-full' formAction={async (formData) => {
        'use server'
        await signIn('credentials', {
          redirectTo: '/',
          ...(Object.fromEntries(formData.entries())),
        })
      }}>{tl('signIn')}</Button>

      <Link className='text-center' href="/signup">
        <Button className='w-full' variant='link'>{tl('signUp')}</Button>
      </Link>
    </form>
  )
}
