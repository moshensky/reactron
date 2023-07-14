import { action } from '@storybook/addon-actions'
import * as React from 'react'
import { FluidDialog } from './FluidDialog'
import { range } from '../utils'

const longContent = range(0, 100).reduce((acc) => acc + ' very long content', '')

export default {
  title: 'common/Dialog/FluidDialog',
}

export const Base = () => <FluidDialog onClose={action('onClose')} content={'content'} />

Base.story = {
  name: 'base',
}

export const LongContent = () => <FluidDialog onClose={action('onClose')} content={longContent} />

LongContent.story = {
  name: 'long content',
}

export const LongContentWithHeaderAndFooter = () => (
  <FluidDialog onClose={action('onClose')} content={longContent} header="header" footer="footer" />
)

LongContentWithHeaderAndFooter.story = {
  name: 'long content with header and footer',
}
