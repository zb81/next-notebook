import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SignInForm from '@/components/login/SignInForm'
import SignInGitHub from '@/components/login/SignInGitHub'

export default function Page() {
  const t = useTranslations('Login')

  return (
    <div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'>
      <Card className='-mt-20'>
        <CardHeader>
          <CardTitle className='text-center'>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className='w-[400px] flex flex-col gap-4'>
          <SignInGitHub />

          <div className='my-4 flex items-center gap-3'>
            <div className='flex-grow bg-border h-[1px]'></div>
            <span className='text-xs text-gray-500'>{t('or')}</span>
            <div className='flex-grow bg-border h-[1px]'></div>
          </div>

          <SignInForm />
        </CardContent>
      </Card>
    </div >
  )
}
