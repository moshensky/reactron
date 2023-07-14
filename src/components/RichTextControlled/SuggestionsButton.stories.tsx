import { action } from '@storybook/addon-actions'
import React from 'react'
import { SuggestionsButton } from './SuggestionsButton'
import { richTextSuggestions } from 'types/rich-text/rich-text.support.test'

export default {
  title: 'common/RichTextControlled/SuggestionsButton',
}

export const Basic = () => (
  <SuggestionsButton onSelect={action('onSelect')} suggestions={richTextSuggestions} />
)

Basic.story = {
  name: 'basic',
}

export const Shown = () => (
  <SuggestionsButton onSelect={action('onSelect')} suggestions={richTextSuggestions} defaultShow />
)

Shown.story = {
  name: 'shown',
}
