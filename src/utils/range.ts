/**
 *
 * @param start
 * @param stop excluding
 * @param step
 */
export const range = (start: number, stop: number, step = 1): ReadonlyArray<number> =>
  Array.from({ length: (stop - start - 1) / step + 1 }, (_, i) => start + i * step)
