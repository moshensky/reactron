import React from 'react'
import { RichTextView } from './RichTextView'
import { richTextData } from 'types/rich-text/rich-text.support.test'

export default {
  title: 'common/RichTextView',
}

export const RichTextVIew = () => <RichTextView data={richTextData} />

RichTextVIew.story = {
  name: 'RichTextVIew',
}
