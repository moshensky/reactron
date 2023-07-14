import { StorybookForm } from '../StorybookForm.test.support'
import { RadioGroup, RadioGroupOptions } from './RadioGroup'

const options: RadioGroupOptions = [
  { label: 'first', value: 'first value' },
  { label: 'second', value: 'second value' },
  { label: 'third', value: 'third value' },
]

export default {
  title: 'common/Form/RadioGroup',
}

export const Default = () => (
  <StorybookForm>
    <RadioGroup name="some" label="Active" options={options} />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Selected = () => (
  <StorybookForm initialValues={{ some: 'second value' }}>
    <RadioGroup name="some" label="Active" options={options} />
  </StorybookForm>
)

Selected.story = {
  name: 'selected',
}

export const Required = () => (
  <StorybookForm>
    <RadioGroup name="some" label="Active" options={options} required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <RadioGroup name="some" label="Active" disabled options={options} />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const SingleOptionDisabled = () => (
  <StorybookForm>
    <RadioGroup
      name="some"
      label="Active"
      options={[
        options[0],
        {
          ...options[1],
          disabled: true,
        },
        options[2],
      ]}
    />
  </StorybookForm>
)

SingleOptionDisabled.story = {
  name: 'single option disabled',
}

export const Error = () => (
  <StorybookForm error>
    <RadioGroup name="some" label="Active" required options={options} />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
