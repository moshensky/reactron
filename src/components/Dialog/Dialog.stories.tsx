import { action } from '@storybook/addon-actions'
import { Dialog } from './Dialog'

const baseProps = {
  size: 'md' as const,
  header: 'header',
  content: 'content',
  footer: 'action',
  onClose: action('onClose'),
}

export default {
  title: 'common/Dialog/Dialog',
}

export const W1200H100P = () => <Dialog {...baseProps} size="w1200h100p" />

W1200H100P.story = {
  name: 'w1200h100p',
}

export const W100Ph100P = () => <Dialog {...baseProps} size="w100ph100p" />

W100Ph100P.story = {
  name: 'w100ph100p',
}
