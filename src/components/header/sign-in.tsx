'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SignIn() {
  const [cbUrl, setCbUrl] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    setCbUrl(encodeURIComponent(location.origin + pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Link href={`/sign-in?callbackUrl=${cbUrl}`} className="">
      <Button variant="ghost">Sign in</Button>
    </Link>
  )
}
