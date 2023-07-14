import { mdiClose } from '@mdi/js'
import classNames from 'classnames'
import { FaIcon } from '../FaIcon'
import React from 'react'

type Props = Readonly<{
  children?: React.ReactNode
  onClose: () => void
  className?: string
  title: React.ReactNode
}>

export function DialogHeader({ onClose, children, className, title }: Props) {
  return (
    <div
      className={classNames('pl-3 flex items-center', className)}
      style={{ borderBottom: '1px solid #e9ecef' }}
    >
      <h5 className="mb-0 mr-auto leading-normal">{title}</h5>

      {children}

      <button type="button" className="close p-3" onClick={onClose}>
        <FaIcon icon={mdiClose} />
      </button>
    </div>
  )
}
