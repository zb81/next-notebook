declare const globalThis: {
  [key: string]: ReturnType<typeof singleton>
} & typeof global

export default function singleton<T>(key: string, factory: () => T): T {
  const instance = globalThis[key] ?? factory()

  if (process.env.NODE_ENV !== 'production') {
    globalThis[key] = instance
  }

  return instance as T
}
