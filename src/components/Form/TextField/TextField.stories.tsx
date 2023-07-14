import React from 'react'
import { StorybookForm } from '../StorybookForm.test.support'
import { TextField } from './TextField'

export default {
  title: 'common/Form/TextField',
}

export const _TextField = () => (
  <StorybookForm>
    <TextField name="some_text" label="text input field" />
  </StorybookForm>
)

_TextField.story = {
  name: 'text field',
}

export const TextFieldFullWidth = () => (
  <StorybookForm>
    <TextField name="some_text" inputClassName="w-full" />
  </StorybookForm>
)

TextFieldFullWidth.story = {
  name: 'text field full width',
}

export const TextArea3Rows = () => (
  <StorybookForm>
    <TextField name="some_text" multiline variant="multiline" rows={3} label="text area field" />
  </StorybookForm>
)

TextArea3Rows.story = {
  name: 'text area 3 rows',
}

export const TextAreaFullWidth = () => (
  <StorybookForm>
    <TextField name="some_text" multiline variant="multiline" inputClassName="w-full" />
  </StorybookForm>
)

TextAreaFullWidth.story = {
  name: 'text area full width',
}
