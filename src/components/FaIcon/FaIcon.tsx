import React from 'react'
import { Icon } from '@mdi/react'

type Props = Readonly<{
  icon: string
  title?: string
  size?: number | string | null
  className?: string
}>

export function FaIcon({ className, icon, title, size }: Props) {
  return <Icon path={icon} size={size || '1rem'} title={title} className={className} />
}
