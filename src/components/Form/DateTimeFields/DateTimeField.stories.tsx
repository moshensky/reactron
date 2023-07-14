import React from 'react'
import { StorybookForm } from '../StorybookForm.test.support'
import { DateTimeField } from './DateTimeField'

export default {
  title: 'common/Form/DateTimeField',
}

export const Default = () => (
  <StorybookForm>
    <DateTimeField name="some" label="Some label" timeCaption="Time" />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Placeholder = () => (
  <StorybookForm>
    <DateTimeField name="some" label="Some label" timeCaption="Time" placeholder="Select date" />
  </StorybookForm>
)

Placeholder.story = {
  name: 'placeholder',
}

export const Required = () => (
  <StorybookForm>
    <DateTimeField name="some" label="Some label" timeCaption="Time" required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <DateTimeField name="some" label="Some label" timeCaption="Time" disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const PreselectedValueIso8061 = () => (
  <StorybookForm initialValues={{ some: '2001-11-29T17:33Z' }}>
    <DateTimeField name="some" label="Some label" timeCaption="Time" />
  </StorybookForm>
)

PreselectedValueIso8061.story = {
  name: 'preselected value ISO8061',
}

export const Error = () => (
  <StorybookForm error>
    <DateTimeField name="some" label="Some label" timeCaption="Time" />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
