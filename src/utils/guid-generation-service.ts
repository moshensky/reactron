import { Guid } from '../types'

export class GuidGenerationService {
  static newGuid(ignoreTestEnv = false): Guid {
    if (ignoreTestEnv === false && process.env.NODE_ENV === 'test') {
      return 'test-id'
    }

    return Guid.of(
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8

        return v.toString(16)
      }),
    )
  }
}
