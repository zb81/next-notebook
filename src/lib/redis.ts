import Redis from 'ioredis'
import { extractEnv } from './utils'
import singleton from './singleton'

export default singleton(
  'redis',
  () => new Redis(extractEnv('REDIS_URL') as string),
)

export const signUpVerificationCodeKey = (email: string) =>
  `signUpVerificationCode:${email}`
