import React, { ElementType } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'
import { SortableGroup, WithId } from '../types'

type Props<T extends WithId> = {
  group: SortableGroup<T>
  itemElement?: ElementType
  onGroupRender: (
    group: SortableGroup<T>,
    setNodeRef: (element: HTMLElement | null) => void,
    items: JSX.Element[],
  ) => JSX.Element
  onItemRender: (item: T) => JSX.Element
}

export function SortableList<T extends WithId>({
  group,
  itemElement,
  onGroupRender,
  onItemRender,
}: Props<T>) {
  const { id, items } = group
  const { setNodeRef } = useDroppable({ id })

  const elements = items.map((x) => (
    <SortableItem key={x.id} id={x.id} element={itemElement}>
      {onItemRender(x)}
    </SortableItem>
  ))

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      {onGroupRender(group, setNodeRef, elements)}
    </SortableContext>
  )
}
