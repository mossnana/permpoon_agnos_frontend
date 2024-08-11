'use client'

import { useContext, type MouseEventHandler } from 'react'
import type { WithChildren, WithType } from '@/types/component'
import type { ButtonType } from '@/types/button'
import { QuestionContext } from '@/context/question'

function Button({
  buttonType = 'primary',
  className = '',
  onClick,
  children,
}: WithChildren<
  WithType<'buttonType', ButtonType> &
    WithType<'onClick', MouseEventHandler<HTMLButtonElement>> &
    WithType<'className', string>
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
