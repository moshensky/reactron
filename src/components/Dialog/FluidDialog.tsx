import React, { useEffect } from 'react'
import { Scrim } from '../Scrim/Scrim'
import { rgba } from '../utils'

type Props = Readonly<{
  zIndex?: number
  header?: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  disableCloseOnEsc?: boolean
  onClose: () => void
}>

const root: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
}
const container: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: 24,
  maxHeight: 'calc(100% - 40px)',
  backgroundColor: 'white',
  boxShadow: `${10}px ${10}px ${24}px ${rgba('#030303', 0.5)}`,
  border: '1px solid rgba(3, 3, 3, 0.2)',
  borderRadius: '0.3rem',
}

export function FluidDialog({
  className,
  style,
  header,
  content,
  footer,
  zIndex,
  disableCloseOnEsc,
  onClose,
}: Props) {
  useEffect(() => {
    const onKeyUp = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && disableCloseOnEsc !== true) {
        onClose()
      }
    }
    document.addEventListener('keyup', onKeyUp)
    return () => document.removeEventListener('keyup', onKeyUp)
  }, [disableCloseOnEsc, onClose])

  return (
    <div style={zIndex ? { ...root, zIndex } : root}>
      <Scrim open onClose={onClose} />
      <div style={{ ...container, ...style }} className={className}>
        <div>{header}</div>
        <div className="flex-grow relative overflow-auto bg-gray-100">{content}</div>
        <div>{footer}</div>
      </div>
    </div>
  )
}
