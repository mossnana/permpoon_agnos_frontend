export type WithKey<K extends string | number, T> = Record<K, T>
export type WithOptionalKey<K extends string | number, T> = Partial<
  Record<K, T>
>
