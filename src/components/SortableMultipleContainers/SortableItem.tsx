import { ElementType, PropsWithChildren } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  id: string | number
  element?: ElementType
}

export function SortableItem({ id, element, children }: PropsWithChildren<Props>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const Element = element || 'div'

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Element ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Element>
  )
}
