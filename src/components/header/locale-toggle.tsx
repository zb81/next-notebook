'use client'

import { LanguagesIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { setUserLocale } from '@/i18n/service'

export default function LocaleToggle() {
  const t = useTranslations('Basic')

  function handleSwitch(locale: 'zh' | 'en') {
    setUserLocale(locale)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title={t('locale')} variant="ghost" size="icon">
          <LanguagesIcon />
          <span className="sr-only">{t('locale')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[80px]">
        <DropdownMenuItem
          className="justify-center"
          onClick={() => handleSwitch('zh')}
        >
          中文
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-center"
          onClick={() => handleSwitch('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
