export type WithId = {
  id: string | number
}

export type SortableGroup<T extends WithId> = {
  id: string
  name: string
  items: Array<T>
}

export type SortableGroups<T extends WithId> = Array<SortableGroup<T>>
