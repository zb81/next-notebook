import SignInForm from '@/components/sign-in-form'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { SearchParamsProps } from '~/index'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Page({ searchParams }: SearchParamsProps) {
  const session = await auth()
  if (session?.user?.id) {
    redirect('/')
  }

  const t = await getTranslations('Auth')

  let cbUrl = (await searchParams)['callbackUrl']
  const headerList = await headers()
  const host = headerList.get('host')
  const protocal = headerList.get('x-forwarded-proto') || 'http'
  if (typeof cbUrl === 'undefined') cbUrl = `${protocal}://${host}`
  else if (Array.isArray(cbUrl)) cbUrl = cbUrl[0]
  cbUrl = encodeURIComponent(cbUrl)

  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <Card className="-mt-20">
        <CardHeader>
          <CardTitle>{t('signInTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="w-[400px] flex flex-col gap-4">
          <SignInForm />
          <p className="text-sm">
            <span className="text-gray-500">{t('noAccount')}</span>

            <Link
              className="underline ml-1 underline-offset-4"
              href={`/sign-up?callbackUrl=${cbUrl}`}
            >
              {t('signUp')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
