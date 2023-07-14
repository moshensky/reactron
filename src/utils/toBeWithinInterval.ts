import { isWithinInterval, addSeconds, subSeconds } from 'date-fns'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeWithinInterval(date: Date, seconds?: number): R
    }
    interface Expect {
      toBeWithinInterval(date: Date, seconds?: number): any
    }
  }
}

expect.extend({
  toBeWithinInterval(received, date: Date, seconds = 7) {
    const start = subSeconds(date, seconds)
    const end = addSeconds(date, seconds)
    const pass = isWithinInterval(received, { start, end })
    return pass
      ? {
          message: () => `expected ${received} not to be within range ${start} - ${end}`,
          pass: true,
        }
      : {
          message: () => `expected ${received} to be within range ${start} - ${end}`,
          pass: false,
        }
  },
})
