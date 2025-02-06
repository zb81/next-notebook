import SignInForm from '@/components/sign-in-form'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { SearchParamsProps } from '~/index'

export default async function Page({ searchParams }: SearchParamsProps) {
  let cbUrl = (await searchParams)['callbackUrl']
  const headerList = await headers()
  const host = headerList.get('host')
  const protocal = headerList.get('x-forwarded-proto') || 'http'

  if (typeof cbUrl === 'undefined') cbUrl = `${protocal}://${host}`
  else if (Array.isArray(cbUrl)) cbUrl = cbUrl[0]

  cbUrl = encodeURIComponent(cbUrl)

  return (
    <div>
      <SignInForm />
      <Link href={`/sign-up?callbackUrl=${cbUrl}`}>Sign Up</Link>
    </div>
  )
}
