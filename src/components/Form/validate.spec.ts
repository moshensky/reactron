import { validate, ArrayValidations, ifArrayAtPathForEach } from './validate'
import { isNotEmpty } from './common-validators'

describe('validate()', () => {
  it('should succeed when there are no validators', () => {
    expect(validate([])({ autosuggestId: '2650f00a-7c98-4245-ac27-3cabba8bf098' })).toEqual({})
  })

  it('should not validate with one validator', () => {
    expect(
      validate([[['valuePrimaryLanguage'], 'is empty', isNotEmpty]])({
        autosuggestId: '2650f00a-7c98-4245-ac27-3cabba8bf098',
      }),
    ).toEqual({
      valuePrimaryLanguage: 'is empty',
    })
  })

  it('should not validate with two validators', () => {
    expect(
      validate([
        [['valuePrimaryLanguage'], 'is empty', isNotEmpty],
        [['valueSecondaryLanguage'], 'is empty', isNotEmpty],
      ])({
        autosuggestId: '2650f00a-7c98-4245-ac27-3cabba8bf098',
      }),
    ).toEqual({
      valuePrimaryLanguage: 'is empty',
      valueSecondaryLanguage: 'is empty',
    })
  })

  it('should not validate FC type `Array`', () => {
    const arrayValidations: ArrayValidations = [
      {
        pathToArray: ['calibrationCertificates'],
        validations: [[['certificateNumber'], 'is empty', isNotEmpty]],
      },
    ]
    const model = {
      calibrationCertificates: [
        {
          certificateNumber: '',
        },
      ],
    }

    expect(validate([], arrayValidations)(model)).toEqual({
      calibrationCertificates: [
        {
          certificateNumber: 'is empty',
        },
      ],
    })
  })

  it('should not validate FC type `Array` secondary items', () => {
    const arrayValidations: ArrayValidations = [
      {
        pathToArray: ['calibrationCertificates', '*', 'measurementDeviations'],
        validations: [[['deviation'], 'is empty', isNotEmpty]],
      },
    ]
    const model = {
      calibrationCertificates: [
        {
          certificateNumber: '',
          measurementDeviations: [{ deviation: '', order: 0 }],
        },
      ],
    }

    expect(validate([], arrayValidations)(model)).toEqual({
      calibrationCertificates: [
        {
          measurementDeviations: [
            {
              deviation: 'is empty',
            },
          ],
        },
      ],
    })
  })
})

describe('ifArrayAtPathForEach()', () => {
  it(`should call forEach for a given path ['a'] and model`, () => {
    const path = ['a']
    const model = {
      a: [1, 2],
    }
    const cb = jest.fn()
    ifArrayAtPathForEach(path, model, cb)
    expect(cb).toHaveBeenCalled()
    expect(cb).toHaveBeenCalledTimes(2)
    expect(cb).toHaveBeenNthCalledWith(1, ['a', '0'], 1, model)
    expect(cb).toHaveBeenNthCalledWith(2, ['a', '1'], 2, model)
  })

  it(`should call forEach for a given path ['a', '*', 'b'] and model`, () => {
    const path = ['a', '*', 'b']
    const model = {
      a: [
        {
          b: [1, 2],
        },
        {
          b: [3, 4],
        },
      ],
    }
    const cb = jest.fn()
    ifArrayAtPathForEach(path, model, cb)
    expect(cb).toHaveBeenCalled()
    expect(cb).toHaveBeenCalledTimes(4)
    expect(cb).toHaveBeenNthCalledWith(1, ['a', '0', 'b', '0'], 1, model)
    expect(cb).toHaveBeenNthCalledWith(2, ['a', '0', 'b', '1'], 2, model)
    expect(cb).toHaveBeenNthCalledWith(3, ['a', '1', 'b', '0'], 3, model)
    expect(cb).toHaveBeenNthCalledWith(4, ['a', '1', 'b', '1'], 4, model)
  })

  it(`should not call forEach for a given path ['a', '*', 'b'] when model doesn't contain array at path`, () => {
    const path = ['a', '*', 'b']
    const model = {
      a: {},
    }
    const cb = jest.fn()
    ifArrayAtPathForEach(path, model, cb)
    expect(cb).toHaveBeenCalledTimes(0)
  })
})
