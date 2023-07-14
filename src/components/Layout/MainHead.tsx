import React from 'react'

type Props = Readonly<{
  title?: React.ReactNode
  children?: React.ReactNode
}>

export function MainHead({ title, children }: Props) {
  return (
    <header className="do-not-print bg-white shadow">
      <div className="flex mx-auto py-4 px-6">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
        <div className="ml-auto">{children}</div>
      </div>
    </header>
  )
}
