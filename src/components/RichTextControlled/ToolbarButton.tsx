import React from 'react'
import classnames from 'classnames'
import { Icon } from '@mdi/react'

const btnStyle: React.CSSProperties = {
  boxShadow: 'none',
}

export type ToolbarButtonProps = Readonly<{
  icon: string
  isActive?: boolean
  onClick: () => void
}>

export const ToolbarButton = ({ icon, isActive, onClick }: ToolbarButtonProps) => (
  <button
    type="button"
    className={classnames(
      'border bg-gray-100  px-2 py-1 hover:bg-gray-300 first:rounded-l last:rounded-r',
      {
        'bg-gray-100': !isActive,
        'bg-gray-300': isActive,
      },
    )}
    style={btnStyle}
    onMouseDown={(ev) => {
      ev.preventDefault()
      onClick()
    }}
  >
    <Icon path={icon} size="1rem" />
  </button>
)
