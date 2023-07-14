import { action } from '@storybook/addon-actions'
import React from 'react'
import { Form } from 'react-final-form'

type Props = React.PropsWithChildren<{
  error?: boolean
  initialValues?: any
}>

export const StorybookForm = ({ error, children, initialValues }: Props) => (
  <Form
    onSubmit={action('on form submit')}
    validate={error ? () => ({ some: 'some error' }) : undefined}
    initialValues={initialValues}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        {children}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    )}
  />
)
