import { mkRichText } from '../../types'
import { RichTextView } from '../../RichTextView'
import React from 'react'
import { StorybookForm } from '../StorybookForm.test.support'
import { SelectField, Props } from './SelectField'

const props: Props = {
  options: [
    { value: 'first', label: 'first value' },
    { value: 'second', label: 'second value' },
    { value: 'third', label: <RichTextView data={mkRichText('third')} /> },
  ],
  name: 'some',
  label: 'select label',
}

export default {
  title: 'common/Form/SelectField',
}

export const Default = () => (
  <StorybookForm>
    <SelectField {...props} />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <SelectField {...props} required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Selected = () => (
  <StorybookForm initialValues={{ some: 'second' }}>
    <SelectField {...props} />
  </StorybookForm>
)

Selected.story = {
  name: 'selected',
}

export const RichTextSelected = () => (
  <StorybookForm initialValues={{ some: 'third' }}>
    <SelectField {...props} />
  </StorybookForm>
)

RichTextSelected.story = {
  name: 'rich text selected',
}

export const Disabled = () => (
  <StorybookForm>
    <SelectField {...props} disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const SelectedWithSelected = () => (
  <StorybookForm initialValues={{ some: 'second' }}>
    <SelectField {...props} disabled />
  </StorybookForm>
)

SelectedWithSelected.story = {
  name: 'selected with selected',
}

export const Error = () => (
  <StorybookForm error>
    <SelectField {...props} required />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
