export const isNotEmptyString = (x: unknown): x is string =>
  typeof x === 'string' && x.trim().length > 0

export const isNil = (x: any): x is null | undefined => x === undefined || x === null

export const not = (x: boolean | undefined): boolean => !x

export const isEmpty = <T>(xs: ReadonlyArray<T>): boolean => xs.length === 0
