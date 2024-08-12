'use client'

import type { MouseEventHandler } from 'react'
import type { WithChildren } from '@/types/component'
import type { WithOptionalKey } from '@/types/base'
import type { ButtonType } from '@/types/button'

function Button({
  buttonType = 'primary',
  className = '',
  onClick,
  children,
}: WithChildren<
  WithOptionalKey<'buttonType', ButtonType> &
    WithOptionalKey<'onClick', MouseEventHandler<HTMLButtonElement>> &
    WithOptionalKey<'className', string>
>) {
  return (
    <button
      className={`${buttonType} rounded-full py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
