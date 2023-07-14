import React from 'react'
import { MultiSelect } from './MultiSelect'
import { options, basic } from '../../MultiSelect/MultiSelect.stories'
import { StorybookForm } from '../StorybookForm.test.support'

export default {
  title: 'common/Form/MultiSelect',
}

export const Default = () => (
  <StorybookForm>
    <MultiSelect name="some" label="Select values" options={options} />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <MultiSelect name="some" label="Select values" required options={options} />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <MultiSelect name="some" label="Select values" disabled options={options} />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const SelectedItems = () => (
  <StorybookForm initialValues={{ tags: basic }}>
    <MultiSelect name="tags" label="Select values" options={options} />
  </StorybookForm>
)

SelectedItems.story = {
  name: 'selected items',
}

export const Error = () => (
  <StorybookForm error>
    <MultiSelect name="some" label="Select values" required options={options} />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
