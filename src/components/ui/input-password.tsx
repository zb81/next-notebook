'use client'

import { ComponentProps, useState } from 'react'

import { Input } from './input'
import { Eye, EyeOff } from 'lucide-react'

export default function InputPassword(props: ComponentProps<typeof Input>) {
  const [isView, setIsView] = useState(false)

  return (
    <div className="relative">
      <Input type={isView ? 'text' : 'password'} {...props} />
      <div className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2">
        {isView ? (
          <EyeOff size={16} onClick={() => setIsView(false)} />
        ) : (
          <Eye size={16} onClick={() => setIsView(true)} />
        )}
      </div>
    </div>
  )
}
