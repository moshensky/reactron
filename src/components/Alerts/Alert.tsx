import React, { PropsWithChildren } from 'react'
import { MessageType } from '../../types'
import cn from 'classnames'

type Props = Readonly<{
  className?: string
  type: MessageType
}>

export const getAlertClasses = (x: MessageType): string => {
  switch (x) {
    case 'danger': {
      return 'bg-red-100 border-red-300 text-red-800'
    }
    case 'info': {
      return 'bg-blue-100 border-blue-300 text-blue-800'
    }
    case 'success': {
      return 'bg-green-100 border-green-300 text-green-800'
    }
    case 'warning': {
      return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    }
  }
}

export function Alert({ className, type, children }: PropsWithChildren<Props>): JSX.Element {
  const classes = cn(className, 'px-5 py-3 mb-4 border rounded', getAlertClasses(type))

  return <div className={classes}>{children}</div>
}
