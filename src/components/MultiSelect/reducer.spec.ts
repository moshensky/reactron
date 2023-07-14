import { MultiselectOptions, MultiselectOption } from './types'
import { filter } from './reducer'

const toOpt = (x: string): MultiselectOption => ({
  id: `id_${x}`,
  label: x,
})

const options: MultiselectOptions = ['first', 'second', 'third'].map(toOpt)

describe('filter', () => {
  it('should filter selected item', () => {
    expect(filter(['second'].map(toOpt), options, '')).toEqual(['first', 'third'].map(toOpt))
  })

  it('should filter selected two items', () => {
    expect(filter(['second', 'third'].map(toOpt), options, '')).toEqual(['first'].map(toOpt))
  })
})
