import { EditableRichTextWithTooltip, Props } from './EditableRichTextWithTooltip'
import { action } from '@storybook/addon-actions'
import { mkRichText } from '../../types'

const baseProps: Props = {
  data: mkRichText('text'),
  tooltip: mkRichText('tooltip text'),
  onTextUpdate: action('onTextUpdate'),
}

export default {
  title: 'common/EditableRichTextWithTooltip',
}

export const Base = () => <EditableRichTextWithTooltip {...baseProps} disabled={false} />

Base.story = {
  name: 'base',
}

export const DisabledRichText = () => <EditableRichTextWithTooltip {...baseProps} disableRichText />

DisabledRichText.story = {
  name: 'disabled rich text',
}

export const Disabled = () => <EditableRichTextWithTooltip {...baseProps} disabled />

Disabled.story = {
  name: 'disabled',
}
