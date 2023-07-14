import React from 'react'

import { MemorySize } from './MemorySize'

export default {
  title: 'common/MemorySize',
}

export const Si = () => <MemorySize value={5000} />

Si.story = {
  name: 'si',
}

export const SiFalse = () => <MemorySize value={5000} si={false} />

SiFalse.story = {
  name: 'si=false',
}
