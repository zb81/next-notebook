import React from 'react'
import { ParamsProps } from '~/index'

export default async function Page({ params }: ParamsProps<{ id: string }>) {
  const { id } = await params
  return <div>{id}</div>
}
