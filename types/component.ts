import type { ReactNode } from 'react'

export type WithChildren<T> = T & {
  children: ReactNode
}

export type WithType<K extends string, T> = Record<K, T>
