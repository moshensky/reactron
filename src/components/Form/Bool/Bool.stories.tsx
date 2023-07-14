import { StorybookForm } from '../StorybookForm.test.support'
import { Bool } from './Bool'

export default {
  title: 'common/Form/Bool',
}

export const Default = () => (
  <StorybookForm>
    <Bool name="some" label="Active" />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <Bool name="some" label="Active" required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <Bool name="some" label="Active" disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const YesSelected = () => (
  <StorybookForm initialValues={{ some: true }}>
    <Bool name="some" label="Active" />
  </StorybookForm>
)

YesSelected.story = {
  name: 'yes selected',
}

export const NoSelected = () => (
  <StorybookForm initialValues={{ some: false }}>
    <Bool name="some" label="Active" />
  </StorybookForm>
)

NoSelected.story = {
  name: 'no selected',
}

export const Error = () => (
  <StorybookForm error>
    <Bool name="some" label="Active" required />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
