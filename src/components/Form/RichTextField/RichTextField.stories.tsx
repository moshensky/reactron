import { mkRichText } from '../../../types'

import { StorybookForm } from '../StorybookForm.test.support'
import { RichTextField } from './RichTextField'

export default {
  title: 'common/Form/RichTextField',
}

export const Default = () => (
  <StorybookForm>
    <RichTextField name="some_text" />
  </StorybookForm>
)

Default.story = {
  name: 'default',
}

export const Required = () => (
  <StorybookForm>
    <RichTextField name="some" label="Select values" required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <RichTextField name="some" label="Select values" disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const InitialValue = () => (
  <StorybookForm
    initialValues={{
      some: [
        {
          type: 'paragraph',
          children: [{ text: 'initial value' }],
        },
      ],
    }}
  >
    <RichTextField name="some" label="Select values" />
  </StorybookForm>
)

InitialValue.story = {
  name: 'initial value',
}

export const Error = () => (
  <StorybookForm error>
    <RichTextField name="some" label="Select values" />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}

export const InAFixedWidthContainer = () => (
  <StorybookForm
    initialValues={{
      some: mkRichText(
        'asdf asdfasdff asdfasdff asdfasdff asdfasdff asdfasdff asdfasdff asdfasdff asdfasdff asdf ;lkjasdf. asdf ',
      ),
    }}
  >
    <RichTextField name="some" />
  </StorybookForm>
)

InAFixedWidthContainer.story = {
  name: 'in a fixed width container',
}
