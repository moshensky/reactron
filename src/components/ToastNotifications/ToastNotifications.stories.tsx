import { ToastNotifications } from './ToastNotifications'
import { Toast } from './Toast'
import { action } from '@storybook/addon-actions'

const uuids = [
  '2844b169-d80f-4952-880c-0474593c572d',
  '9125f036-d326-4db9-b247-7c1270acca1f',
  '1edda916-33d6-4454-9384-d6efd40148b0',
  '3d990231-4a4b-4b2a-8f2a-91c8b50a169d',
  '93a761bf-107a-418c-ad07-93c1030576c5',
  '0c8020ff-ea7c-4ee7-866e-6e9f5afe7b2a',
  'ad986fa0-a338-48bf-aa49-e26a8b8da875',
  'f991e956-caaf-4cbf-9235-1aa88041af78',
  '2e5c43cf-d276-4360-8442-a3f8cce793d1',
  'c2380e01-1384-4daf-8954-ea81cabdab44',
]

export default {
  title: 'common/ToastNotification',
}

export const AllToastsM = () => (
  <>
    <Toast type="danger" text="danger toast" />
    <Toast type="info" text="info toast" />
    <Toast type="success" text="success toast" />
    <Toast type="warning" text="warning toast" />
  </>
)

AllToastsM.story = {
  name: 'all toasts (m)',
}

export const ToastWithLongText = () => (
  <Toast
    type="info"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  />
)

ToastWithLongText.story = {
  name: 'Toast with long text',
}

export const _ToastNotifications = () => (
  <ToastNotifications
    toasts={[
      { uuid: uuids[0], type: 'danger', text: 'danger toast' },
      { uuid: uuids[1], type: 'info', text: 'info toast' },
      { uuid: uuids[2], type: 'success', text: 'success toast' },
      { uuid: uuids[3], type: 'warning', text: 'warning toast' },
    ]}
    onClose={action('onClose')}
  ></ToastNotifications>
)

_ToastNotifications.story = {
  name: 'toast notifications',
}
