import { SortDirection, SortItem } from '../../types'
import { mdiSortAscending, mdiSortDescending } from '@mdi/js'

import { FaIcon } from '../FaIcon'

type Props<T extends string> = Readonly<{
  name: T
  label: React.ReactNode
  sortGridBy?: SortItem<T>
  onChange: (sortGridBy?: SortItem<T>) => void
}>

export function SortLabel<T extends string>({ name, label, sortGridBy, onChange }: Props<T>) {
  return sortGridBy && sortGridBy.name === name ? (
    sortGridBy.direction === SortDirection.Asc ? (
      <a
        href="#"
        className="lw-sort-label"
        onClick={(ev: React.SyntheticEvent<HTMLAnchorElement>) => {
          ev.preventDefault()
          onChange({ name, direction: SortDirection.Desc })
        }}
      >
        {label}
        <FaIcon icon={mdiSortAscending} className="inline" />
      </a>
    ) : (
      <a
        href="#"
        className="lw-sort-label"
        onClick={(ev: React.SyntheticEvent<HTMLAnchorElement>) => {
          ev.preventDefault()
          onChange()
        }}
      >
        {label}
        <FaIcon icon={mdiSortDescending} className="inline" />
      </a>
    )
  ) : (
    <a
      href="#"
      className="lw-sort-label"
      onClick={(ev: React.SyntheticEvent<HTMLAnchorElement>) => {
        ev.preventDefault()
        onChange({ name, direction: SortDirection.Asc })
      }}
    >
      {label}
      <i className="fa" style={{ fontSize: 'inherit' }} />
    </a>
  )
}
