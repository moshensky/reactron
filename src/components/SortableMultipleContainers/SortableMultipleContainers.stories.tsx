import { action } from '@storybook/addon-actions'
import * as React from 'react'
import { SortableMultipleContainers } from './SortableMultipleContainers'
import { SortableGroups } from '../types'

const mkItem = (xs: string[]) => xs.map((id) => ({ id, index: `${id}-index` }))
const groups: SortableGroups<{ id: string; index: string }> = [
  {
    id: 'first_id',
    name: 'First Group',
    items: mkItem(['1', '2', '3']),
  },
  {
    id: 'second_id',
    name: 'Second Group',
    items: mkItem(['4', '5', '6']),
  },
  {
    id: 'third_id',
    name: 'Third Group',
    items: mkItem(['7', '8', '9']),
  },
  {
    id: 'fourth_id',
    name: 'Fourth Group',
    items: [],
  },
]

const containerStyle = {
  background: '#dadada',
  padding: 10,
  margin: 10,
  flex: 1,
}

export default {
  title: 'common/SortableMultipleContainers',
}

export const Base = () => (
  <SortableMultipleContainers
    groups={groups}
    onGroupRender={(group, setNodeRef, items) => (
      <div>
        <h2>{group.name}</h2>
        <div ref={setNodeRef} style={containerStyle}>
          {items}
        </div>
      </div>
    )}
    onItemRender={(item) => (
      <>
        Item {item.id} with index {item.index}
      </>
    )}
    onChange={action('onChange')}
  />
)

Base.story = {
  name: 'base',
}
