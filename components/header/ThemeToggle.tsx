'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function ThemeToggle() {
  const t = useTranslations('Theme')

  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title={t('toggle')} variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('toggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[80px]">
        <DropdownMenuItem
          className="justify-center"
          onClick={() => setTheme('light')}
        >
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-center"
          onClick={() => setTheme('dark')}
        >
          {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-center"
          onClick={() => setTheme('system')}
        >
          {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
