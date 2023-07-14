import { StorybookForm } from '../StorybookForm.test.support'
import { BoolWithAll } from './BoolWithAll'

export default {
  title: 'common/Form/BoolWithAll',
}

export const Default = () => (
  <StorybookForm>
    <BoolWithAll name="some" label="Active" />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <BoolWithAll name="some" label="Active" required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <BoolWithAll name="some" label="Active" disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const AllSelected = () => (
  <StorybookForm initialValues={{ some: 'all' }}>
    <BoolWithAll name="some" label="Active" />
  </StorybookForm>
)

AllSelected.story = {
  name: 'all selected',
}

export const YesSelected = () => (
  <StorybookForm initialValues={{ some: 'yes' }}>
    <BoolWithAll name="some" label="Active" />
  </StorybookForm>
)

YesSelected.story = {
  name: 'yes selected',
}

export const NoSelected = () => (
  <StorybookForm initialValues={{ some: 'no' }}>
    <BoolWithAll name="some" label="Active" />
  </StorybookForm>
)

NoSelected.story = {
  name: 'no selected',
}

export const Error = () => (
  <StorybookForm error>
    <BoolWithAll name="some" label="Active" required />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
