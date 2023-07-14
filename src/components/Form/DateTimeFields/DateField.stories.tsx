import { action } from '@storybook/addon-actions'

import { Form } from 'react-final-form'
import { DateField } from './DateTimeField'

export default {
  title: 'common/Form/DateField',
}

export const Default = () => (
  <Form
    onSubmit={action('on form submit')}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <DateField name="some" label="Some label" />
      </form>
    )}
  />
)

Default.story = {
  name: 'default',
}

export const Placeholder = () => (
  <Form
    onSubmit={action('on form submit')}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <DateField name="some" label="Some label" placeholder="Select date" />
      </form>
    )}
  />
)

Placeholder.story = {
  name: 'placeholder',
}

export const Required = () => (
  <Form
    onSubmit={action('on form submit')}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <DateField name="some" label="Some label" required />
      </form>
    )}
  />
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <Form
    onSubmit={action('on form submit')}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <DateField name="some" label="Some label" disabled />
      </form>
    )}
  />
)

Disabled.story = {
  name: 'disabled',
}

export const PreselectedValueIso8061 = () => (
  <Form
    onSubmit={action('on form submit')}
    initialValues={{ some: '2001-11-29T17:33Z' }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <DateField name="some" label="Some label" />
      </form>
    )}
  />
)

PreselectedValueIso8061.story = {
  name: 'preselected value ISO8061',
}

export const Error = () => (
  <Form
    onSubmit={action('on form submit')}
    validate={() => ({ some: 'some error' })}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <DateField name="some" label="Some label" />
        <button type="submit">Press me to see error</button>
      </form>
    )}
  />
)

Error.story = {
  name: 'error',
}
