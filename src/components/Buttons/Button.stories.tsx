import { mdiContentSaveOutline, mdiPlusThick, mdiTrashCanOutline } from '@mdi/js'
import { action } from '@storybook/addon-actions'

import { Button, Variant } from './Button'

const variants: Variant[] = ['primary', 'secondary', 'success', 'danger', 'warning']
const mkButtons = (outline?: boolean) =>
  variants.map((x) => (
    <Button
      className="mr-1"
      key={`${x}${outline ? 'outline' : ''}`}
      outline={outline}
      variant={x}
      icon={mdiPlusThick}
      title={x}
      label={x}
      onClick={action('onClick')}
    />
  ))

export default {
  title: 'common/Buttons/Button',
}

export const AllM = () => (
  <>
    {mkButtons()}
    <br />
    <div className="mt-1">{mkButtons(true)}</div>
    <br />
    <Button
      outline
      variant="primary"
      icon={mdiContentSaveOutline}
      title="just icon"
      onClick={action('onClick')}
    />
  </>
)

AllM.story = {
  name: 'all (m)',
}

export const DeleteButton = () => (
  <Button
    outline
    variant="danger"
    icon={mdiTrashCanOutline}
    title={'delete'}
    onClick={action('on delete')}
  />
)

DeleteButton.story = {
  name: 'delete button',
}

export const DeleteButtonWithLabel = () => (
  <Button
    outline
    label="delete"
    variant="danger"
    icon={mdiTrashCanOutline}
    title={'delete'}
    onClick={action('on delete')}
  />
)

DeleteButtonWithLabel.story = {
  name: 'delete button with label',
}

export const Add = () => (
  <Button
    className="ml-3"
    onClick={action('onClick')}
    variant="success"
    label="Add"
    icon={mdiPlusThick}
  />
)

Add.story = {
  name: 'add',
}
