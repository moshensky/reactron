import { mdiCheckboxBlankOutline, mdiCheckboxMarkedOutline } from '@mdi/js'
import { FaIcon } from '../FaIcon'
import React from 'react'

type Props = Readonly<{
  value: boolean
}>

export function BoolView({ value }: Props) {
  return <FaIcon icon={value ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline} />
}
