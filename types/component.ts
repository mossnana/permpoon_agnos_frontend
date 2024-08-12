import type { ReactNode } from 'react'
import type { WithKey } from './base'

export type WithChildren<T> = T & WithKey<'children', ReactNode>
export type WithType<K extends string, T> = Record<K, T>
