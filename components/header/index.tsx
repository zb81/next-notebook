import Image from 'next/image'
import React from 'react'

import icon from '@/assets/icon.png'
import LocaleToggle from './LocaleToggle'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { auth, signOut } from '@/auth'
import { Button } from '../ui/button'
import { getTranslations } from 'next-intl/server'

export default async function Header() {
  const t = await getTranslations('Basic')

  const session = await auth()
  const isLoggedIn = !!session?.user

  console.log(session?.user)

  return (
    <header className='h-14 pl-4 pr-3 flex items-center justify-between bg-background sticky top-0'>
      <Link href="/" className='flex items-center'>
        <Image className='w-7' src={icon} alt="Next Notebook Icon" />
        <h1 className='ml-2 text-lg'>Next Notebook</h1>
      </Link>

      <div className='flex items-center'>
        {isLoggedIn && (
          <div className='flex items-center gap-4 mr-3'>
            <span>{t('welcome')}{session!.user!.name}</span>
            <form action={async () => {
              'use server'
              await signOut()
            }}>
              <Button variant='secondary' size='sm'>{t('signOut')}</Button>
            </form>
          </div>
        )}
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </header>
  )
}
