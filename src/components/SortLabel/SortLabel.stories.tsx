import { SortDirection } from '../../types'
import { action } from '@storybook/addon-actions'

import { SortLabel } from './SortLabel'

export default {
  title: 'common/SortLabel',
}

export const Default = () => (
  <SortLabel
    label={<span>label name</span>}
    name="isAccredited"
    onChange={action('on sort label sort')}
  />
)

Default.story = {
  name: 'default',
}

export const _Asc = () => (
  <SortLabel
    label={<span>request number</span>}
    name="requestNumber"
    sortGridBy={{
      name: 'requestNumber',
      direction: SortDirection.Asc,
    }}
    onChange={action('on sort label sort')}
  />
)

_Asc.story = {
  name: 'asc',
}

export const _Desc = () => (
  <SortLabel
    label={<span>label name</span>}
    name="requestNumber"
    sortGridBy={{
      name: 'requestNumber',
      direction: SortDirection.Desc,
    }}
    onChange={action('on sort label sort')}
  />
)

_Desc.story = {
  name: 'desc',
}
