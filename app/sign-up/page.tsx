import { checkAuth } from '@/auth'
import SignUpForm from '@/components/SignUpForm'

export default async function Page() {
  await checkAuth()
  return <SignUpForm />
}
