import { BoolView } from './BoolView'

export default {
  title: 'common/BoolView',
}

export const Checked = () => <BoolView value />

Checked.story = {
  name: 'checked',
}

export const Unchecked = () => <BoolView value={false} />

Unchecked.story = {
  name: 'unchecked',
}
