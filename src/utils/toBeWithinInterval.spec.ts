import { addSeconds } from 'date-fns'

describe('toBeWithinInterval', () => {
  it('should pass', () => {
    expect(addSeconds(new Date(), 3)).toBeWithinInterval(new Date(), 5)
    expect(addSeconds(new Date(), 30)).not.toBeWithinInterval(new Date(), 5)
    expect({ completedAt: addSeconds(new Date(), 3) }).toEqual({
      completedAt: expect.toBeWithinInterval(new Date()),
    })
  })
})
