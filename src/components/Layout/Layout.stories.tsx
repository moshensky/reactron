import React from 'react'
import { Container } from './Container'
import { MainContent } from './MainContent'
import { MainHead } from './MainHead'

export default {
  title: 'common/Layout',
}

export const Default = () => (
  <Container>
    <MainHead title="Title">main head children</MainHead>
    <MainContent>main content children</MainContent>
  </Container>
)

Default.story = {
  name: 'default',
}

export const DefaultLoading = () => (
  <Container>
    <MainHead title="Title">main head children</MainHead>
    <MainContent loading>main content children</MainContent>
  </Container>
)

DefaultLoading.story = {
  name: 'default loading',
}

export const _MainHead = () => <MainHead title="Sample title"></MainHead>

_MainHead.story = {
  name: 'MainHead',
}
