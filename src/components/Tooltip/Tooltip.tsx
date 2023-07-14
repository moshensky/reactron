import React from 'react'
import { createPopper, Instance, Options } from '@popperjs/core'
import './tooltip.css'

type Props = {
  className?: string
  children: React.ReactNode
  tooltip: React.ReactNode
}

const opts: Partial<Options> = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ],
}
const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

function mkTimeout() {
  let hideTimeout: NodeJS.Timeout | undefined
  return {
    clearHideTimeout() {
      if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = undefined
      }
    },
    setHideTimeout(f: () => void) {
      hideTimeout = setTimeout(f, 150)
    },
  }
}

export function Tooltip({ children, className, tooltip }: Props) {
  const targetRef = React.createRef<HTMLDivElement>()
  const tooltipRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    const { setHideTimeout, clearHideTimeout } = mkTimeout()
    let popperInstance: Instance
    const target = targetRef.current
    const tooltip = tooltipRef.current
    function show() {
      clearHideTimeout()
      if (tooltip) {
        tooltip.setAttribute('data-show', '')
      }
    }
    function hide() {
      clearHideTimeout()
      if (tooltip) {
        setHideTimeout(() => tooltip.removeAttribute('data-show'))
      }
    }
    if (target && tooltip) {
      popperInstance = createPopper(target, tooltip, opts)
      showEvents.forEach((event) => target.addEventListener(event, show))
      hideEvents.forEach((event) => target.addEventListener(event, hide))
      showEvents.forEach((event) => tooltip.addEventListener(event, show))
      hideEvents.forEach((event) => tooltip.addEventListener(event, hide))
    }

    return () => {
      if (popperInstance) {
        popperInstance.destroy()
      }

      if (target) {
        showEvents.forEach((event) => target.removeEventListener(event, show))
        hideEvents.forEach((event) => target.removeEventListener(event, hide))
      }
      if (tooltip) {
        showEvents.forEach((event) => tooltip.removeEventListener(event, show))
        hideEvents.forEach((event) => tooltip.removeEventListener(event, hide))
      }
    }
  })

  return (
    <>
      <div ref={targetRef} className={className}>
        {children}
      </div>
      <div ref={tooltipRef} className="lw-tooltip">
        <div>{tooltip}</div>
        <div className="lw-arrow" data-popper-arrow></div>
      </div>
    </>
  )
}
