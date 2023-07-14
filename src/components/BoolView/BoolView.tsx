import { mdiCheckboxBlankOutline, mdiCheckboxMarkedOutline } from '@mdi/js'
import { FaIcon } from '../FaIcon'

type Props = Readonly<{
  value: boolean
}>

export function BoolView({ value }: Props) {
  return <FaIcon icon={value ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline} />
}
