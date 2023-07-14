import React from 'react'
import { Progress } from './Progress'

export default {
  title: 'common/Progress',
}

export const Base = () => <Progress animated color="info" value={100} className="mb-1" />

Base.story = {
  name: 'base',
}
