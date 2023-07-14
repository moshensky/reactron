import { createPopper, Instance } from '@popperjs/core'
import './popover.css'
import { useOnClickOutside } from '../../hooks'
import cn from 'classnames'
import React from 'react'

type Props = {
  className?: string
  trigger: (show: () => void) => React.ReactNode
  header?: (hide: () => void) => React.ReactNode
  body: (hide: () => void) => React.ReactNode
  defaultShow?: boolean
}

export function Popover({ trigger, body, header, defaultShow, className }: Props) {
  const [showPopover, setShowPopover] = React.useState(defaultShow || false)
  const targetRef = React.createRef<HTMLDivElement>()
  const popoverRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    let popperInstance: Instance
    if (targetRef.current && popoverRef.current) {
      popperInstance = createPopper(targetRef.current, popoverRef.current, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 6],
            },
          },
        ],
      })
    }

    return () => {
      if (popperInstance) {
        popperInstance.destroy()
      }
    }
  })

  const show = () => setShowPopover(true)
  const hide = () => setShowPopover(false)

  useOnClickOutside(showPopover, [popoverRef, targetRef], hide)

  return (
    <>
      <div ref={targetRef} className={className}>
        {trigger(showPopover ? hide : show)}
      </div>
      {showPopover && (
        <div ref={popoverRef} className="lw-popover border rounded border-gray-400 bg-white">
          <div className={cn('lw-arrow', { header: header })} data-popper-arrow></div>
          {header && (
            <h3 className="px-3 py-2 bg-gray-100 border-b border-gray-200 bg-clip-padding rounded-t">
              {header(hide)}
            </h3>
          )}
          <div className="px-3 py-2">{body(hide)}</div>
        </div>
      )}
    </>
  )
}
