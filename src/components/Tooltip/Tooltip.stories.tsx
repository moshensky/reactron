import { mdiTrashCanOutline } from '@mdi/js'
import { action } from '@storybook/addon-actions'
import { Button } from '../Buttons'
import React from 'react'
import { Tooltip } from './Tooltip'

const button = (
  <Button
    outline
    variant="danger"
    icon={mdiTrashCanOutline}
    title={'delete'}
    onClick={action('onClick')}
  />
)

const body = (
  <div style={{ width: 150 }}>
    <Button variant="primary" onClick={action('onClick')} label="cancel" />
    <Button
      className="ml-1"
      variant="secondary"
      outline
      onClick={action('confirm')}
      label="confirm"
    />
  </div>
)

export default {
  title: 'common/Tooltip',
}

export const Default = () => <Tooltip tooltip="this is tooltip">{button}</Tooltip>

Default.story = {
  name: 'default',
}

export const Complex = () => <Tooltip tooltip={body}>{button}</Tooltip>

Complex.story = {
  name: 'complex',
}
