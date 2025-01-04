import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className='prose mx-auto'>
      <div className='flex items-center mb-8'>
        <Skeleton className='w-1/2 h-10' />
        <Skeleton className='w-[80px] ml-5 h-9 rounded-lg' />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className='w-full h-5 mb-3' />
      ))}
    </div>
  )
}
