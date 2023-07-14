import { mdiTrashCanOutline } from '@mdi/js'
import { action } from '@storybook/addon-actions'

import { ConfirmButton } from './ConfirmButton'

export default {
  title: 'common/Buttons/ConfirmButton',
}

export const DefaultM = () => (
  <ConfirmButton
    domId="test-id"
    outline
    variant="danger"
    icon={mdiTrashCanOutline}
    title={'delete'}
    onClick={action('on delete')}
  />
)

DefaultM.story = {
  name: 'default (m)',
}
