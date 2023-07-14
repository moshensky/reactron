import { StorybookForm } from '../StorybookForm.test.support'
import { FileField } from './FileField'

export default {
  title: 'common/Form/FileField',
}

export const Append = () => (
  <StorybookForm>
    <FileField
      name="some"
      label="Active"
      append={(files) => <button type="submit">Press to submit {files.length} files</button>}
    />
  </StorybookForm>
)

Append.story = {
  name: 'append',
}

export const Required = () => (
  <StorybookForm>
    <FileField name="some" label="Active" required />
  </StorybookForm>
)

Required.story = {
  name: 'required',
}

export const Disabled = () => (
  <StorybookForm>
    <FileField name="some" label="Active" disabled />
  </StorybookForm>
)

Disabled.story = {
  name: 'disabled',
}

export const Error = () => (
  <StorybookForm error>
    <FileField name="some" label="Active" required />
  </StorybookForm>
)

Error.story = {
  name: 'error',
}
