import React from 'react'
import { TextInputWithButtons } from './TextInputWithButtons'
import { action } from '@storybook/addon-actions'

export default {
  title: 'common/TextInputWithButtons',
}

export const Base = () => <TextInputWithButtons text="some text" onSave={action('onSave')} />

Base.story = {
  name: 'base',
}
