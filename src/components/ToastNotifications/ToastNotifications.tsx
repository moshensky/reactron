import React from 'react'
import { MessageType } from '../types'
import { Toast } from './Toast'

type Props = Readonly<{
  toasts: ReadonlyArray<{
    uuid: string
    type: MessageType
    text: string
  }>
  onClose: (uuid: string) => void
}>

export function ToastNotifications({ toasts, onClose }: Props): JSX.Element {
  return (
    <div className="fixed left-0 bottom-0 m-2 w-96 z-10000 do-not-print">
      {toasts.map((x) => (
        <Toast type={x.type} text={x.text} key={x.uuid} onClose={() => onClose(x.uuid)} />
      ))}
    </div>
  )
}
