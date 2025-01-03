import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SignUpForm from '@/components/SignUpForm'

export default function Page() {
  const t = useTranslations('SignUpForm')

  return (
    <div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'>
      <Card className='-mt-20'>
        <CardHeader>
          <CardTitle className='text-center'>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className='w-[400px] flex flex-col gap-4'>
          <SignUpForm />
        </CardContent>
      </Card>
    </div >
  )
}
