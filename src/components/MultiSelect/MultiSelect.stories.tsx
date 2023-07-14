import { action } from '@storybook/addon-actions'
import React from 'react'
import { MultiSelect } from './MultiSelect'
import { MultiselectOptions } from './types'
import { Tag } from './Tag'
import { indicatorsSyncModel } from '../VirtualizedList/VirtualizedList.data.support.test'

export const basic: MultiselectOptions = ['first', 'second', 'third'].map((x) => ({
  id: `id_${x}`,
  label: x,
}))

export const options: MultiselectOptions = indicatorsSyncModel
  .slice(0, 300)
  .map((x) => ({
    id: `${x.indicatorId}`,
    label: x.name,
  }))
  .concat(basic)

const DelayedData = () => {
  const [items, setItems] = React.useState<MultiselectOptions>([])
  React.useEffect(() => {
    setTimeout(() => setItems(options))
  })

  return <MultiSelect initialSelected={[]} options={items} onChange={action('onChange')} />
}

export default {
  title: 'common/MultiSelect',
  excludeStories: ['basic', 'options'],
}

export const _Tag = () => <Tag label={basic[0].label} onRemoveTag={action('onRemoveTag')} />

export const TagDisabled = () => (
  <Tag label={basic[0].label} disabled onRemoveTag={action('onRemoveTag')} />
)

TagDisabled.story = {
  name: 'Tag disabled',
}

export const Invalid = () => (
  <MultiSelect initialSelected={basic} options={options} invalid onChange={action('onChange')} />
)

Invalid.story = {
  name: 'invalid',
}

export const Disabled = () => (
  <MultiSelect initialSelected={basic} options={options} disabled onChange={action('onChange')} />
)

Disabled.story = {
  name: 'disabled',
}

export const _100Width = () => (
  <MultiSelect initialSelected={basic} options={options} onChange={action('onChange')} />
)

_100Width.story = {
  name: '100% width',
}

export const FixedWidth = () => (
  <MultiSelect initialSelected={basic} options={options} onChange={action('onChange')} />
)

FixedWidth.story = {
  name: 'fixed width',
}

export const DisabledEmpty = () => (
  <MultiSelect initialSelected={[]} options={options} disabled onChange={action('onChange')} />
)

DisabledEmpty.story = {
  name: 'disabled empty',
}

export const SelectWithInitialEmptyStateAndThenUpdatedWithDataM = () => <DelayedData />

SelectWithInitialEmptyStateAndThenUpdatedWithDataM.story = {
  name: 'select with initial empty state and then updated with data (m)',
}

export const SelectedItemsShouldNotBePresentInOptions = () => {
  const selected: MultiselectOptions = ['second'].map((x) => ({
    id: `id_${x}`,
    label: x,
  }))
  const options: MultiselectOptions = ['first', 'second', 'third'].map((x) => ({
    id: `id_${x}`,
    label: x,
  }))
  return <MultiSelect initialSelected={selected} options={options} onChange={action('onChange')} />
}

SelectedItemsShouldNotBePresentInOptions.story = {
  name: 'selected items should not be present in options',
}
