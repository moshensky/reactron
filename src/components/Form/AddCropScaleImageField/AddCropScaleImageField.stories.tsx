import React from 'react'
import { StorybookForm } from '../StorybookForm.test.support'
import { AddCropScaleImageField } from './AddCropScaleImageField'

export default {
  title: 'common/Form/AddCropScaleImageField',
}

export const Default = () => (
  <StorybookForm>
    <AddCropScaleImageField name="some" label="Active" />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <AddCropScaleImageField name="some" label="Active" required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <AddCropScaleImageField name="some" label="Active" disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const Error = () => (
  <StorybookForm error>
    <AddCropScaleImageField name="some" label="Active" required />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
