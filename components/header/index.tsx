import Image from 'next/image'
import React from 'react'

import icon from '@/assets/icon.png'
import LocaleToggle from './LocaleToggle'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='h-14 pl-4 pr-3 flex items-center justify-between bg-background sticky top-0'>
      <Link href="/" className='flex items-center'>
        <Image className='w-7' src={icon} alt="Next Notebook Icon" />
        <h1 className='ml-2 text-lg'>Next Notebook</h1>
      </Link>

      <div className='flex items-center'>
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </header>
  )
}
