import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { ValuePath, Validator } from './validate'
import { isValid as dfIsValid, isDate } from 'date-fns'
import { isNil, not } from '../../utils'
import { isRichTextEmpty, RichText } from '../../types'

function isEmpty(variable: unknown): boolean {
  if (variable === null) {
    return true
  }

  if (Array.isArray(variable)) {
    if (variable.length === 0) {
      return true
    }
    const isRichTextAndIsEmpty = pipe(
      RichText.decode(variable),
      E.map(isRichTextEmpty),
      E.getOrElse(() => false),
    )

    return isRichTextAndIsEmpty
  }

  const type = typeof variable
  switch (type) {
    case 'bigint': {
      return false
    }
    case 'boolean': {
      return false
    }
    case 'function': {
      return !variable
    }
    case 'number': {
      return isNaN(variable as number)
    }
    case 'object': {
      if (isDate(variable)) {
        return false
      } else if (variable instanceof File) {
        return variable.size === 0
      }

      return Object.keys(variable as object).length === 0
    }
    case 'string': {
      return (variable as string).trim().length === 0
    }
    case 'symbol': {
      return !variable
    }
    case 'undefined': {
      return true
    }
  }
}

export const isNotEmpty = (value: any): boolean => not(isNil(value) || isEmpty(value))

export const isDateValid = (value: any): boolean => isDate(value) && dfIsValid(value)

export const isNumberGreaterThan =
  (num: number) =>
  (value: any): boolean =>
    isNotEmpty(value) && value > num

export const isEmail = (value: any): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return isNotEmpty(value) && re.test(value)
}

export const requiredValidator = (errorMsg: React.ReactNode = 'Required') => ({
  errorMsg,
  validator: isNotEmpty,
})

export const emailValidator = (errorMsg: React.ReactNode = 'Invalid email') => ({
  errorMsg,
  validator: isEmail,
})

export const isNumberValidator = (errorMsg: React.ReactNode = 'It must be a valid number') => ({
  errorMsg,
  validator: (x: any) => !isNaN(x),
})

export const isOptionalNumberValidator = (
  errorMsg: React.ReactNode = 'It must be a valid number',
) => ({
  errorMsg,
  validator: (x: any) => isEmpty(x) || !isNaN(x),
})

export const isNumberSmallerValidator = (max: number, errorMsg: React.ReactNode) => ({
  errorMsg: errorMsg || `It must be smaller than ${max}`,
  validator: (x: any) => isNumberValidator().validator(x) && x > 0 && x < max,
})

export const mkRequiredValidator = (
  path: ValuePath,
  errorMsg: React.ReactNode = 'Required',
): Validator => Validator.of(path, errorMsg, isNotEmpty)

export const passwordValidator = (errorMsg: React.ReactNode = 'Passwords mismatch') => ({
  errorMsg,
  validator: (password: any, values: any) =>
    isNotEmpty(password) && password === values.password_confirm,
})
