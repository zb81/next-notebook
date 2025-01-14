'use server'

import { signIn as authSignIn } from '@/auth'

export async function signIn(_: unknown, formData: FormData) {
  await authSignIn('credentials', {
    redirect: false,
    ...Object.fromEntries(formData.entries()),
  })
}
