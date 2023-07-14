import { RichText, RichText as RichTextT } from '../../types'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import { DelayedData } from '../utils'
import { RichTextControlled } from './RichTextControlled'
import { Symbols } from './Symbols'
import { richTextData, richTextSuggestions } from 'types/rich-text/rich-text.support.test'

const richTextSample1: RichTextT = [
  {
    type: 'p',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const WithState = ({
  defaultValue,
  render,
}: {
  defaultValue?: RichText
  render: (setState: (x: RichText) => void, state?: RichText) => JSX.Element
}) => {
  const [value, setValue] = useState(defaultValue)

  return render(setValue, value)
}

export default {
  title: 'common/RichTextControlled',
}

export const Basic = () => (
  <WithState
    render={(set, val) => (
      <RichTextControlled
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

Basic.story = {
  name: 'basic',
}

export const DisableRichText = () => (
  <WithState
    render={(set, val) => (
      <RichTextControlled
        disableRichText
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

DisableRichText.story = {
  name: 'disable rich text',
}

export const DefaultValue = () => (
  <WithState
    defaultValue={richTextSample1}
    render={(set, val) => (
      <RichTextControlled
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

DefaultValue.story = {
  name: 'default value',
}

export const WithInitialEmptyStateAndThenUpdatedWithData = () => (
  <DelayedData
    data={richTextSample1}
    timeout={1000}
    render={(items) => <RichTextControlled value={items} onChange={action('onChange')} />}
  />
)

WithInitialEmptyStateAndThenUpdatedWithData.story = {
  name: 'with initial empty state and then updated with data',
}

export const SuggestionsEmpty = () => (
  <WithState
    render={(set, val) => (
      <RichTextControlled
        suggestions={richTextSuggestions}
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

SuggestionsEmpty.story = {
  name: 'suggestions: empty',
}

export const SuggestionsWithValue = () => (
  <WithState
    defaultValue={richTextSample1}
    render={(set, val) => (
      <RichTextControlled
        suggestions={richTextSuggestions}
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

SuggestionsWithValue.story = {
  name: 'suggestions: with value',
}

export const SuggestionsRichTextDisabled = () => (
  <WithState
    render={(set, val) => (
      <RichTextControlled
        disableRichText
        suggestions={richTextSuggestions}
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

SuggestionsRichTextDisabled.story = {
  name: 'suggestions: rich text disabled',
}

export const SingleLine = () => (
  <WithState
    defaultValue={richTextSample1}
    render={(set, val) => (
      <RichTextControlled
        singleLine
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

SingleLine.story = {
  name: 'single line',
}

export const Disabled = () => (
  <WithState
    defaultValue={richTextSample1}
    render={(set, val) => (
      <RichTextControlled
        disabled
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

Disabled.story = {
  name: 'disabled',
}

export const VariousStylesOfRichText = () => (
  <WithState
    defaultValue={richTextData}
    render={(set, val) => (
      <RichTextControlled
        value={val}
        onChange={(x) => {
          action('onChange')(x)
          set(x)
        }}
      />
    )}
  />
)

VariousStylesOfRichText.story = {
  name: 'various styles of rich text',
}

export const _Symbols = () => <Symbols onSymbolSelect={action('onSymbolClick')} />

_Symbols.story = {
  name: 'symbols',
}

export const SymbolsDisabledRichText = () => (
  <Symbols onSymbolSelect={action('onSymbolClick')} disableRichText />
)

SymbolsDisabledRichText.story = {
  name: 'symbols disabled rich text',
}
