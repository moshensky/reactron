import React from 'react'

// TODO: evaluate function
// const formatBytes = (n: number, digits?: number) => {
//   if (0 === n) return '0 Bytes'
//   const c = 1024
//   const d = digits || 1
//   const e = ['Bytes', 'KB', 'MB', 'GB', 'TB']
//   const f = Math.floor(Math.log(n) / Math.log(c))
//   return parseFloat((n / Math.pow(c, f)).toFixed(d)) + e[f]
// }

export function humanFileSize(bytes: number, si: boolean): string {
  const thresh = si ? 1000 : 1024
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  let size = bytes
  do {
    size /= thresh
    ++u
  } while (Math.abs(size) >= thresh && u < units.length - 1)

  return `${size.toFixed(1)} ${units[u]}`
}

type Props = Readonly<{
  value: number
  si?: boolean
  className?: string
}>

export function MemorySize({ value, className, si }: Props) {
  return <span className={className}>{humanFileSize(value, si === false ? false : true)}</span>
}
