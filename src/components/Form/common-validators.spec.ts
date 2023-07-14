import { isDateValid, isNotEmpty } from './common-validators'

describe('isDateValid()', () => {
  it('should fail on empty string', () => {
    expect(isDateValid('')).toEqual(false)
  })

  it('should fail when invalid date', () => {
    expect(isDateValid(new Date(''))).toEqual(false)
  })

  it('should fail on ISOString', () => {
    expect(isDateValid('2018-08-10T09:44:31.103331+03:00')).toEqual(false)
  })

  it('should pass on valid date', () => {
    expect(isDateValid(new Date(2014, 1, 31))).toEqual(true)
  })
})

describe('isNotEmpty()', () => {
  it('should fail when null', () => expect(isNotEmpty(null)).toEqual(false))
  it('should fail when undefined', () => expect(isNotEmpty(undefined)).toEqual(false))

  describe('Array', () => {
    it('should fail when empty', () => expect(isNotEmpty([])).toEqual(false))
    it('should succeed', () => expect(isNotEmpty(['some'])).toEqual(true))
  })

  describe('boolean', () => {
    it('should succeed when false', () => expect(isNotEmpty(false)).toEqual(true))
    it('should succeed when true', () => expect(isNotEmpty(true)).toEqual(true))
  })

  describe('function', () => {
    it('should succeed', () => expect(isNotEmpty(() => true)).toEqual(true))
  })

  describe('number', () => {
    it('should fail when NaN', () => expect(isNotEmpty(NaN)).toEqual(false))
    it('should succeed', () => expect(isNotEmpty(7)).toEqual(true))
  })

  describe('object', () => {
    it('should fail', () => expect(isNotEmpty({})).toEqual(false))
    it('should succeed', () => expect(isNotEmpty({ x: true })).toEqual(true))
    it('should succeed when prop undefined', () =>
      expect(isNotEmpty({ x: undefined })).toEqual(true))
    it('should succeed when Date', () =>
      expect(isNotEmpty(new Date('2012-12-24T17:55:40Z'))).toEqual(true))
  })

  describe('string', () => {
    it('should fail when filled with spaces only', () => expect(isNotEmpty('  ')).toEqual(false))
    it('should succeed', () => expect(isNotEmpty(' some ')).toEqual(true))
  })
})
