export const rgba = (c: string, opacity: number) => {
  if (c.length < 7 || c.length > 7) {
    throw new Error('Please use full color HEX!')
  }

  return `rgba(${parseInt(c[1] + c[2], 16)}, ${parseInt(c[3] + c[4], 16)}, ${parseInt(
    c[5] + c[6],
    16,
  )}, ${opacity})`
}
