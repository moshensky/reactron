import React, { MouseEvent, useCallback } from 'react'
import { FaIcon } from '../FaIcon'
import cn from 'classnames'

export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning'

export type Props = {
  variant: Variant
  label?: React.ReactNode
  icon?: string
  outline?: boolean
  className?: string
  disabled?: boolean
  title?: string
  type?: 'submit' | 'button' | 'reset'
  id?: string
  stopPropagation?: boolean
  onClick?: (x: MouseEvent) => void
}

export const common =
  'inline-flex items-center px-2 py-1 text-sm font-medium h-8 text-center transition rounded ripple focus:outline-none border'

export const getVariant = (variant: Variant, outline?: boolean): string => {
  switch (variant) {
    case 'danger':
      return outline
        ? 'border-red-500 text-red-500 bg-transparent hover:bg-red-100'
        : 'border-red-500 text-white bg-red-500 shadow hover:shadow-lg hover:bg-red-600'
    case 'primary':
      return outline
        ? 'border-blue-500 text-blue-500 bg-transparent hover:bg-blue-100'
        : 'border-blue-500 text-white bg-blue-500 shadow hover:shadow-lg hover:bg-blue-600'
    case 'secondary':
      return outline
        ? 'border-gray-500 text-gray-500 bg-transparent hover:bg-gray-100'
        : 'border-gray-500 text-white bg-gray-500 shadow hover:shadow-lg hover:bg-gray-600'
    case 'success':
      return outline
        ? 'border-green-500 text-green-500 bg-transparent hover:bg-green-100'
        : 'border-green-500 text-white bg-green-500 shadow hover:shadow-lg hover:bg-green-600'
    case 'warning':
      return outline
        ? 'border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-100'
        : 'border-yellow-500 text-white bg-yellow-500 shadow hover:shadow-lg hover:bg-yellow-600'
  }
}

export function Button({
  label,
  icon,
  outline,
  variant,
  className,
  onClick,
  stopPropagation,
  ...rest
}: Props) {
  const onClickHandler = useCallback(
    (x: MouseEvent) => {
      if (stopPropagation) {
        x.stopPropagation()
      }
      if (onClick) {
        onClick(x)
      }
    },
    [onClick, stopPropagation],
  )
  return (
    <button
      type={rest.type || 'button'}
      className={cn(common, getVariant(variant, outline), className)}
      onClick={onClickHandler}
      {...rest}
    >
      {icon && (
        <div>
          <FaIcon icon={icon} className={cn({ 'mr-1': label })} />
        </div>
      )}
      {label && <div className="leading-none">{label}</div>}
    </button>
  )
}
