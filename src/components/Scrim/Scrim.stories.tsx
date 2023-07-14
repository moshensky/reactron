import { action } from '@storybook/addon-actions'
import * as React from 'react'
import { Scrim } from './Scrim'

export default {
  title: 'common/Scrim',
}

export const Base = () => <Scrim open onClose={action('onClick')} />

Base.story = {
  name: 'base',
}
