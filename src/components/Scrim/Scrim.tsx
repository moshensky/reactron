import React from 'react'
import Transition, { TransitionStatus } from 'react-transition-group/Transition'
import { rgba } from '../utils/rgba'

const ANIMATION_DURATION = 150

const transitionStyles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: {
    opacity: 0,
  },
  entered: {
    opacity: 1,
  },
}

type Props = Readonly<{
  open: boolean
  backgroundColor?: string
  onClose: () => void
}>

export function Scrim({ open, backgroundColor, onClose }: Props) {
  return (
    <Transition in={open} timeout={ANIMATION_DURATION}>
      {(state) => (
        <div
          style={{
            transition: `opacity ${ANIMATION_DURATION}ms`,
            opacity: 0,
            ...transitionStyles[state],
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: rgba(backgroundColor || '#030303', 0.6),
          }}
          onClick={onClose}
        />
      )}
    </Transition>
  )
}
