import classNames from 'classnames'
import React from 'react'

type Props = Readonly<{
  text: string
  isActive: boolean
  style: React.CSSProperties
  onMouseEnter: () => void
  onClick: () => void
}>

export function Item({ text, isActive, style, onMouseEnter, onClick }: Props) {
  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseDown={(ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        onClick()
      }}
      className={classNames(
        'relative cursor-pointer block border-none h-auto text-left px-3 py-1',
        {
          'text-gray-900 bg-gray-100': isActive,
        },
      )}
    >
      {text}
    </div>
  )
}
