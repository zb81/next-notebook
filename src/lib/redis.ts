import Redis from 'ioredis'
import { extractEnv } from './utils'

const redisSingleton = () => {
  return new Redis(extractEnv('REDIS_URL') as string)
}

declare const globalThis: {
  redisGlobal: ReturnType<typeof redisSingleton>
} & typeof global

const redis = globalThis.redisGlobal ?? redisSingleton()

export default redis

if (process.env.NODE_ENV !== 'production') globalThis.redisGlobal = redis
