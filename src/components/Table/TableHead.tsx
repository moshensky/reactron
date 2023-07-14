import React from 'react'

type Props = Readonly<{
  children: React.ReactNode
}>

export function TableHead({ children }: Props) {
  return (
    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </thead>
  )
}
