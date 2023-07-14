import cn from 'classnames'
import { ElementType, useEffect, useState } from 'react'
import {
  UniqueIdentifier,
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'
import { SortableList } from './SortableList'
import { SortableGroup, SortableGroups, WithId } from '../../types'

type Props<T extends WithId> = {
  className?: string
  groups: SortableGroups<T>
  itemElement?: ElementType
  onGroupRender: (
    group: SortableGroup<T>,
    setNodeRef: (element: HTMLElement | null) => void,
    items: JSX.Element[],
  ) => JSX.Element
  onItemRender: (item: T) => JSX.Element
  onChange: (x: SortableGroups<T>) => void
}

export function SortableMultipleContainers<T extends WithId>({
  className,
  groups,
  itemElement,
  onItemRender,
  onGroupRender,
  onChange,
}: Props<T>) {
  const [items, setItems] = useState(groups)
  const [activeId, setActiveId] = useState<UniqueIdentifier>()

  useEffect(() => {
    onChange(items)
  }, [items, onChange])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <div className={cn('flex flex-col', className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {items.map((x) => (
          <SortableList
            key={x.id}
            itemElement={itemElement}
            group={x}
            onGroupRender={onGroupRender}
            onItemRender={onItemRender}
          />
        ))}
        <DragOverlay>
          {activeId ? (
            <SortableItem element={itemElement} id={activeId}>
              {onItemRender(findItem(activeId))}
            </SortableItem>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )

  function findItem(id: string | number): T {
    const containerIdx = findContainerIdx(id)
    const item = items[containerIdx].items.find((x) => x.id === id)
    if (item === undefined) {
      throw new Error('This should not happen')
    }
    return item
  }

  function findContainerIdx(id: UniqueIdentifier): number {
    const containerIdx = items.findIndex((x) => x.id === id)
    if (containerIdx !== -1) {
      return containerIdx
    }

    return items.findIndex((x) => x.items.map((y) => y.id).includes(id))
  }

  function handleDragStart(ev: DragStartEvent) {
    const { active } = ev
    const { id } = active

    setActiveId(id)
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (over === null) {
      return
    }
    const { id } = active
    const { id: overId } = over

    // Find the containers
    const activeContainerIdx = findContainerIdx(id)
    const overContainerIdx = findContainerIdx(overId)

    if (
      activeContainerIdx === -1 ||
      overContainerIdx === -1 ||
      activeContainerIdx === overContainerIdx
    ) {
      return
    }

    setItems((prev) => {
      const activeItems = prev[activeContainerIdx]
      const overItems = prev[overContainerIdx]

      // Find the indexes for the items
      const activeIndex = activeItems.items.findIndex((x) => x.id === id)
      const overIndex = overItems.items.findIndex((x) => x.id === overId)

      let newIndex
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.items.length + 1
      } else {
        const { top, height } = active.rect.current.translated!
        const isBelowLastItem =
          overIndex === overItems.items.length - 1 &&
          top + height > over.rect.top + over.rect.height
        // top > over.rect.top + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.items.length + 1
      }

      const newActiveContainerItems = [
        ...prev[activeContainerIdx].items.filter((item) => item.id !== active.id),
      ]
      const newOverContainerItems = [
        ...prev[overContainerIdx].items.slice(0, newIndex),
        items[activeContainerIdx].items[activeIndex],
        ...prev[overContainerIdx].items.slice(newIndex, prev[overContainerIdx].items.length),
      ]

      const result = [...prev]
      result[activeContainerIdx] = {
        ...result[activeContainerIdx],
        items: newActiveContainerItems,
      }

      result[overContainerIdx] = {
        ...result[overContainerIdx],
        items: newOverContainerItems,
      }

      return result
    })
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over === null) {
      return
    }
    const { id } = active
    const { id: overId } = over

    const activeContainerIdx = findContainerIdx(id)
    const overContainerIdx = findContainerIdx(overId)

    if (
      activeContainerIdx === -1 ||
      overContainerIdx === -1 ||
      activeContainerIdx !== overContainerIdx
    ) {
      return
    }

    const activeIndex = items[activeContainerIdx].items.findIndex((x) => x.id === id)
    const overIndex = items[overContainerIdx].items.findIndex((x) => x.id === overId)

    if (activeIndex !== overIndex) {
      setItems((groups) => {
        const newGroups = [...groups]
        newGroups[overContainerIdx] = {
          ...newGroups[overContainerIdx],
          items: arrayMove(newGroups[overContainerIdx].items, activeIndex, overIndex),
        }

        return newGroups
      })
    }

    setActiveId(undefined)
  }
}
