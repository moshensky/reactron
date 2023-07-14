import { StorybookForm } from '../StorybookForm.test.support'
import { TagsSelect } from './TagsSelect'

const options = ['first', 'second', 'third']

export default {
  title: 'common/Form/TagsSelect',
}

export const Default = () => (
  <StorybookForm>
    <TagsSelect name="some" label="Select values" options={options} />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <TagsSelect name="some" label="Select values" required options={options} />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <TagsSelect name="some" label="Select values" disabled options={options} />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const SelectedItems = () => (
  <StorybookForm initialValues={{ tags: ['first'] }}>
    <TagsSelect name="tags" label="Select values" options={options} />
  </StorybookForm>
)

SelectedItems.story = {
  name: 'selected items',
}

export const Error = () => (
  <StorybookForm error>
    <TagsSelect name="some" label="Select values" required options={options} />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
