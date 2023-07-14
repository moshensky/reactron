import { action } from '@storybook/addon-actions'
import React from 'react'
import { ToggleButton, ToggleButtonOptions } from './ToggleButton'

const yesNoOptions: ToggleButtonOptions<'yes' | 'no'> = [
  { id: 'yes', selected: false, label: 'yes' },
  { id: 'no', selected: false, label: 'no' },
]

const yesNoAll: ToggleButtonOptions<'yes' | 'no' | 'all'> = [
  { id: 'yes', selected: false, label: 'yes' },
  { id: 'no', selected: false, label: 'no' },
  { id: 'all', selected: true, label: 'all' },
]

export default {
  title: 'common/Buttons/ToggleButton',
}

export const YesNo = () => <ToggleButton options={yesNoOptions} onChange={action('onChange')} />

YesNo.story = {
  name: 'yes | no',
}

export const YesNoAll = () => <ToggleButton options={yesNoAll} onChange={action('onChange')} />

YesNoAll.story = {
  name: 'yes | no | all',
}
