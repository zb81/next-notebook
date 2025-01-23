import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

export function formatDate(date: Date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function saltAndHashPassword(password: string) {
  return password
}

export function extractEnv(key: string, type: 'string' | 'number' = 'string') {
  const v = process.env[key]
  if (typeof v === 'undefined') {
    console.error(`${key} is not provided.`)
    process.exit(1)
  }

  if (type === 'string') return v

  if (type === 'number') {
    const n = Number(v)
    if (isNaN(n)) {
      console.error(`${key} is not a number.`)
      process.exit(1)
    }
    return n
  }
}
