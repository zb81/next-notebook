import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { signOut } from '@/auth'

export function SignOut() {
  const t = useTranslations('Basic')

  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <Button variant="secondary" size="sm">
        {t('signOut')}
      </Button>
    </form>
  )
}
