'use server'

import { cookies, headers } from 'next/headers'

import { defaultLocale, locales } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  const locale = (await cookies()).get(COOKIE_NAME)?.value
  if (locale) {
    return locale
  }
  const acceptLanguage = (await headers()).get('accept-language')
  const parsedLocale = acceptLanguage?.split(',')[0].split('-')[0] || ''
  return locales.includes(parsedLocale) ? parsedLocale : defaultLocale
}

export async function setUserLocale(locale: string) {
  if (!locales.includes(locale)) {
    locale = defaultLocale
  }
  ;(await cookies()).set(COOKIE_NAME, locale)
}
