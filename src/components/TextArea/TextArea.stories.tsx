import React from 'react'
import { TextArea } from './TextArea'

export default {
  title: 'common/TextArea',
}

export const Default = () => <TextArea />

Default.story = {
  name: 'default',
}

export const Disabled = () => <TextArea disabled value="disabled text area" />

Disabled.story = {
  name: 'disabled',
}

export const Invalid = () => <TextArea invalid />

Invalid.story = {
  name: 'invalid',
}
