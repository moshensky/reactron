import { Input } from './Input'

export default {
  title: 'common/Input',
}

export const Default = () => <Input />

Default.story = {
  name: 'default',
}

export const Disabled = () => <Input disabled value="disabled input" />

Disabled.story = {
  name: 'disabled',
}

export const Invalid = () => <Input invalid />

Invalid.story = {
  name: 'invalid',
}
