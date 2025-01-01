import { useTranslations } from 'next-intl'

import GitHubIcon from '@/components/icons/GitHubIcon'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/auth'

export default function Page() {
  const t = useTranslations('Login')

  return (
    <div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'>
      <Card className='-mt-20'>
        <CardHeader>
          <CardTitle className='text-center'>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='w-[400px] flex flex-col gap-4'>
            <Button variant='outline' className='w-full' formAction={async () => {
              'use server'
              await signIn('github')
            }}>
              <GitHubIcon />
              {t('github')}
            </Button>
            <Button variant='outline' className='w-full'>
              <GoogleIcon />
              {t('google')}
            </Button>

            <div className='my-4 flex items-center gap-3'>
              <div className='flex-grow bg-border h-[1px]'></div>
              <span className='text-xs text-gray-500'>{t('or')}</span>
              <div className='flex-grow bg-border h-[1px]'></div>
            </div>

            <Label htmlFor='email'>{t('email')}</Label>
            <Input id='email' type="email" name='email' />

            <Label htmlFor='password'>{t('password')}</Label>
            <Input className='' id='password' type="password" name='password' />

            <Button className='w-full'>{t('signIn')}</Button>

            <Button variant='link'>{t('signUp')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
