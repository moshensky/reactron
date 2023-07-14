import { useEffect, useState } from 'react'

type DelayedDataProps<T> = Readonly<{
  data: ReadonlyArray<T>
  timeout?: number
  render: (data: ReadonlyArray<T>) => JSX.Element
}>

export function DelayedData<T>({ data, timeout, render }: DelayedDataProps<T>) {
  const [items, setItems] = useState<ReadonlyArray<T>>([])
  useEffect(() => {
    const ticks = setTimeout(() => setItems(data), timeout)
    return () => clearTimeout(ticks)
  })

  return render(items)
}
