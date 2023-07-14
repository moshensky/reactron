import React from 'react'
import cn from 'classnames'

type Props = Readonly<{
  className?: string
  rows?: number
  value?: string
  autoFocus?: boolean
  invalid?: boolean
  disabled?: boolean
  id?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  onFocus?: () => void
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}>

export function TextArea({ className, rows, invalid, ...rest }: Props) {
  return (
    <textarea
      rows={rows || 3}
      className={cn('block shadow-sm sm:text-sm rounded', className, {
        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !invalid,
        'border-red-300 focus:ring-red-500 focus:border-red-500': invalid,
        'text-gray-900 bg-gray-100': rest.disabled,
      })}
      {...rest}
    />
  )
}
