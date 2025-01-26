import { PropsWithChildren } from 'react'

export interface SearchParamsProps extends PropsWithChildren {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export interface ParamsProps<T> extends PropsWithChildren {
  params: Promise<T>
}
