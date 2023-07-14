import { FaIcon } from '../FaIcon'
import { mdiAsterisk } from '@mdi/js'

export function RequiredSymbol() {
  return (
    <sup className="text-red-500">
      <FaIcon icon={mdiAsterisk} size="0.5rem" className="inline" />
    </sup>
  )
}
