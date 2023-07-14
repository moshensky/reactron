import React from 'react'
import { MessageType } from '../types'
import { Alert } from './Alert'

const types: ReadonlyArray<MessageType> = ['danger', 'info', 'success', 'warning']

export default {
  title: 'common/Alert',
}

export const AllToastsM = () => (
  <>
    {types.map((x) => (
      <Alert type={x} key={x}>
        A simple {x} alert - check it out!
      </Alert>
    ))}
  </>
)

AllToastsM.story = {
  name: 'all toasts (m)',
}
