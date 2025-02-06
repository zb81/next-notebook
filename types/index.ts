export interface SearchParamsProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export interface ParamsProps<T> {
  params: Promise<T>
}
