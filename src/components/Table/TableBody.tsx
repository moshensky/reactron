import React from 'react'

type Props = Readonly<{
  children: React.ReactNode
}>

export function TableBody({ children }: Props) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
}
