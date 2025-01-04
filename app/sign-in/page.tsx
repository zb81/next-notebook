import { checkAuth } from '@/auth'
import SignInForm from '@/components/SignInForm'

export default async function Page() {
  await checkAuth()
  return <SignInForm />
}
