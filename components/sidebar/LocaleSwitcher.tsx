'use client'

import { LanguagesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { redirect, usePathname } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const pathname = usePathname()

  function handleSwitch(locale: 'zh' | 'en') {
    redirect({ href: pathname, locale })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <LanguagesIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] text-center p-2">
        <Button variant="ghost" size="sm" onClick={() => handleSwitch('zh')}>
          中文
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleSwitch('en')}>
          English
        </Button>
      </PopoverContent>
    </Popover>
  )
}
