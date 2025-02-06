import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import icon from '@/assets/icon.png'
import { auth } from '@/auth'
import LocaleToggle from './locale-toggle'
import ThemeToggle from './theme-toggle'
import { SignOut } from './sign-out'

export default async function Header() {
  const t = await getTranslations('Basic')

  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <header className="h-14 pl-4 pr-3 flex items-center justify-between bg-background sticky top-0">
      <Link href="/" className="flex items-center">
        <Image className="w-7" src={icon} alt="Next Notebook Icon" />
        <h1 className="ml-2 text-lg">Next Notebook</h1>
      </Link>

      <div className="flex items-center">
        {isLoggedIn && (
          <div className="flex items-center gap-4 mr-3">
            <span>
              {t('welcome')}
              {session!.user!.email}
            </span>
            <SignOut />
          </div>
        )}
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </header>
  )
}
