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
