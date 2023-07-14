import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

type Props = Readonly<{
  style?: React.CSSProperties
  className?: string
}>

export function Card({ className, style, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'flex flex-col border rounded border-gray-300 bg-white bg-clip-padding',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className }: PropsWithChildren<Props>) {
  return <div className={cn('flex-auto p-4', className)}>{children}</div>
}

export function CardHeader({ children, className }: PropsWithChildren<Props>) {
  return <div className={cn('py-2 border-b border-gray-300', className)}>{children}</div>
}

export function CardFooter({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={cn('px-4 py-2 border-t border-gray-300 bg-gray-100', className)}>
      {children}
    </div>
  )
}
