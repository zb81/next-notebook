'use client'

import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

export default function SearchInput() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const t = useTranslations('Basic')

  function handleSearch(v: string) {
    const p = new URLSearchParams(window.location.search)
    if (v) {
      p.set('q', v)
    } else {
      p.delete('q')
    }
    startTransition(() => {
      replace(`${pathname}?${p.toString()}`)
    })
  }

  return (
    <Input
      placeholder={t('search')}
      onChange={e => handleSearch(e.target.value)}
    />
  )
}
