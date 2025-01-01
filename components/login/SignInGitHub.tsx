import React from 'react'
import { useTranslations } from 'next-intl'

import { signIn } from '@/auth'
import GitHubIcon from '../icons/GitHubIcon'
import { Button } from '../ui/button'

export default function SignInGitHub() {
  const t = useTranslations('Login')

  return (
    <form className='' action={async () => {
      'use server'
      await signIn('github', { redirectTo: '/' })
    }}>
      <Button variant='outline' className='w-full'>
        <GitHubIcon />
        {t('github')}
      </Button>
    </form>
  )
}
