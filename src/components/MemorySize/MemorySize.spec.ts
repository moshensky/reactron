import { humanFileSize } from './MemorySize'

describe('humanFileSize()', () => {
  it('kb si', () => {
    expect(humanFileSize(5000, true)).toEqual('5.0 kB')
  })

  it('kb', () => {
    expect(humanFileSize(5000, false)).toEqual('4.9 KiB')
  })

  it('YiB', () => {
    expect(humanFileSize(-10000000000000000000000000000, false)).toEqual('-8271.8 YiB')
  })
})
