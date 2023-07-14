export type ValuePath = Array<string>
export type ErrorMessage = React.ReactNode
export type IsValid = (value: any, model: any) => boolean
export type Validator = [ValuePath, ErrorMessage, IsValid]
export const Validator = {
  of: (path: ValuePath, error: ErrorMessage, isValid: IsValid): Validator => [path, error, isValid],
}

type ErrorsResult<T> = T extends object ? { [P in keyof T]?: ErrorsResult<T[P]> } : ErrorMessage
type ValidationResult<T extends object> = {
  [P in keyof T]?: ErrorsResult<T[P]>
}

// NB! Ugly and error prone code
function setToValue(obj: any, value: any, path: ValuePath): void {
  if (path.length === 0) {
    throw new Error('ValuePath has to contain at least one value!')
  }

  let i
  for (i = 0; i < path.length - 1; i++) {
    const propName = path[i]
    if (obj[propName] === undefined) {
      if (isNaN(parseInt(path[i + 1], 10))) {
        obj[propName] = {}
      } else {
        obj[propName] = []
      }
    }

    obj = obj[propName]
  }

  obj[path[i]] = value
}

export const validateProp = <T extends object>(
  [path, errorMessage, isValid]: Validator,
  values: T,
  errors: ValidationResult<T>,
): void => {
  const value = path.reduce((acc: any, x) => (acc || {})[x], values)
  if (isValid(value, values) === false) {
    setToValue(errors, errorMessage, path)
  }
}

export type ArrayValidations = ReadonlyArray<{
  pathToArray: Array<string>
  validations: ReadonlyArray<Validator>
}>

/**
 * Execute function for each element of the array located at path of the given model
 */
export function ifArrayAtPathForEach<T extends object>(
  path: ValuePath,
  model: T,
  forEach: (path: ValuePath, valAtIdx: any, model: T) => void,
): void {
  const arrIndex = path.findIndex((x) => x === '*')
  if (arrIndex === -1) {
    const arr = path.reduce((acc: any, x) => acc[x], model)
    if (Array.isArray(arr)) {
      arr.forEach((val, idx) => forEach(path.concat(`${idx}`), val, model))
    } else {
      throw new Error(`Not an array at path (${JSON.stringify(path)}) for model: ${model}`)
    }

    return
  }

  const pathToStarArr = path.slice(0, arrIndex)
  const pathAfterStarArr = path.slice(arrIndex + 1)
  const arr = pathToStarArr.reduce((acc: any, x) => acc[x], model)
  if (Array.isArray(arr)) {
    arr.forEach((_, idx) =>
      ifArrayAtPathForEach([...pathToStarArr, `${idx}`, ...pathAfterStarArr], model, forEach),
    )
  }
}

export const validate =
  (validations: ReadonlyArray<Validator>, arrayValidations?: ArrayValidations) =>
  <T extends object>(model: T): ValidationResult<T> => {
    const errors: ValidationResult<T> = {}
    validations.forEach((validator) => validateProp(validator, model, errors))
    if (arrayValidations !== undefined) {
      arrayValidations.forEach((x) =>
        x.validations.forEach(([path, errorMessage, validator]) =>
          ifArrayAtPathForEach(x.pathToArray, model, (p) =>
            validateProp(Validator.of([...p, ...path], errorMessage, validator), model, errors),
          ),
        ),
      )
    }

    return errors
  }
