'use client'

import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useTransition } from "react";

export default function SearchInput() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

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
      placeholder="搜索"
      onChange={e => handleSearch(e.target.value)}
    />
  )
}
