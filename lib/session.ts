import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export async function getSessionUserId() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/sign-in')
  }

  return session.user.id
}
