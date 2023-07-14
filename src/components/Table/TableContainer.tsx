import React from 'react'
import cn from 'classnames'

type Props = Readonly<{
  className?: string
  loading?: boolean
  children: React.ReactNode
  footer?: React.ReactNode
}>

export function TableContainer({ className, loading, children, footer }: Props) {
  return (
    <div className="shadow border-b border-gray-200 sm:rounded-lg">
      <table
        className={cn(className, 'lw-table min-w-full divide-y divide-gray-200', {
          'lw-loading-mask': loading,
        })}
      >
        {children}
      </table>
      {footer && footer}
    </div>
  )
}
