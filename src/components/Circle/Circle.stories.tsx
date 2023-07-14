import React from 'react'
import { Circle } from './Circle'

export default {
  title: 'common/Circle',
}

export const Default = () => (
  <div className="bg-black">
    <Circle>simple </Circle>
  </div>
)

Default.story = {
  name: 'default',
}
