import { mdiTrashCanOutline } from '@mdi/js'
import { action } from '@storybook/addon-actions'
import { Button } from '../Buttons'

import { Popover } from './Popover'

const trigger = (show: () => void) => (
  <Button outline variant="danger" icon={mdiTrashCanOutline} title={'delete'} onClick={show} />
)
const body = (hide: () => void) => (
  <div style={{ width: 150 }}>
    <Button variant="primary" onClick={hide} label="cancel" />
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
  title: 'common/Popover',
}

export const DefaultM = () => <Popover trigger={trigger} header={() => 'title'} body={body} />

DefaultM.story = {
  name: 'default (m)',
}

export const X3M = () => (
  <>
    <div style={{ margin: 20 }}>
      <Popover trigger={trigger} body={body} />
    </div>
    <div style={{ margin: 20 }}>
      <Popover trigger={trigger} header={() => 'second'} body={body} />
    </div>
    <div style={{ margin: 20 }}>
      <Popover trigger={trigger} body={() => <span>third thingy</span>} />
    </div>
  </>
)

X3M.story = {
  name: 'x3 (m)',
}

export const ContentOnlyM = () => (
  <Popover
    trigger={(show) => <Button variant="primary" label="show" onClick={show} />}
    body={(hide) => <Button variant="primary" onClick={hide} label="hide" />}
  />
)

ContentOnlyM.story = {
  name: 'content only (m)',
}

export const Opened = () => (
  <Popover defaultShow trigger={trigger} header={() => 'title'} body={body} />
)

Opened.story = {
  name: 'opened',
}

export const WideBody = () => (
  <Popover
    defaultShow
    trigger={trigger}
    header={() => 'title'}
    body={() => (
      <>
        <div style={{ width: 300, backgroundColor: 'red' }}>
          300 px line 300 px line 300 px line 300 px line 300 px line 300 px line 300 px line 300 px
          line
        </div>
        asdf asdf
        <br />
      </>
    )}
  />
)

WideBody.story = {
  name: 'wide body',
}
