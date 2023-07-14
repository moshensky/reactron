import React from 'react'

type Props = Readonly<{
  className?: string
  filterLabel?: React.ReactNode
  children: React.ReactNode
}>

export function TableFilter({ className, filterLabel, children }: Props) {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mr-11 pb-1">
        {filterLabel || 'Filter'}
      </h3>
      <div className="w-full">{children}</div>
    </div>
  )
}
