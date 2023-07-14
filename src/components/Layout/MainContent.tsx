import React from 'react'
import { Progress } from '../Progress'

type Props = Readonly<{
  children: React.ReactNode
  loading?: boolean
}>

export function MainContent({ children, loading }: Props) {
  return (
    <main className="relative">
      {loading && (
        <Progress animated color="info" value={100} className="absolute top-0 inset-x-0" />
      )}
      <div className="mx-auto p-6">{children}</div>
    </main>
  )
}
