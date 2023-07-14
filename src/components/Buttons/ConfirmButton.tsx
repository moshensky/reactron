import { Popover } from '../Popover'
import React from 'react'
import { Button, Props as ButtonProps } from './Button'

type Props = ButtonProps &
  Readonly<{
    pleaseConfirmLabel?: React.ReactNode
    cancelLabel?: React.ReactNode
    confirmLabel?: React.ReactNode
    domId?: string
    stopPropagation?: boolean
  }>

export function ConfirmButton({
  pleaseConfirmLabel,
  cancelLabel,
  confirmLabel,
  domId,
  stopPropagation,
  onClick,
  ...rest
}: Props) {
  return (
    <Popover
      className="inline"
      trigger={(show) => (
        <Button
          {...rest}
          onClick={(x) => {
            if (stopPropagation) {
              x.stopPropagation()
            }
            show()
          }}
        />
      )}
      header={() => confirmLabel || 'Confirm'}
      body={(hide) => (
        <div className="whitespace-nowrap">
          <Button
            variant="primary"
            stopPropagation={stopPropagation}
            onClick={() => hide()}
            label={cancelLabel || 'Cancel'}
          />
          <Button
            className="ml-1"
            variant="secondary"
            outline
            stopPropagation={stopPropagation}
            onClick={(ev) => {
              onClick && onClick(ev)
              hide()
            }}
            label={confirmLabel || 'Confirm'}
          />
        </div>
      )}
    />
  )
}
