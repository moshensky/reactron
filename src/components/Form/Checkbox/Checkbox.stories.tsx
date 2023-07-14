import { StorybookForm } from '../StorybookForm.test.support'
import { Checkbox } from './Checkbox'

export default {
  title: 'common/Form/Checkbox',
}

export const Unchecked = () => (
  <StorybookForm>
    <Checkbox name="some" label="Unchecked" />
  </StorybookForm>
)

Unchecked.story = {
  name: 'unchecked',
}

export const Checked = () => (
  <StorybookForm initialValues={{ some: true }}>
    <Checkbox name="some" label="Checked" />
  </StorybookForm>
)

Checked.story = {
  name: 'checked',
}
