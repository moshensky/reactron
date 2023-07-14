import React, { PropsWithChildren } from 'react'

export function Circle({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <div className="h-6 w-6 rounded-full bg-white flex justify-center items-center">{children}</div>
  )
}
