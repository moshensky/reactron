import React from 'react'

type Props = Readonly<{
  children?: React.ReactNode
}>

export function DialogFooter({ children }: Props) {
  return (
    <div className="flex items-center justify-end p-4 border-t border-t-gray-300 rounded-b-md">
      {children}
    </div>
  )
}
