import cn from 'classnames'

export type ToggleButtonOptions<T> = ReadonlyArray<{
  id: T
  label: React.ReactNode
  selected: boolean
}>

type Props<T> = {
  options: ToggleButtonOptions<T>
  disabled?: boolean
  onChange: (id: T) => void
}

export function ToggleButton<T>({ options, disabled, onChange }: Props<T>) {
  return (
    <div>
      {options.map((x) => (
        <button
          key={`${x.id}`}
          type="button"
          className={cn(
            'inline-flex items-center px-2 py-1 text-sm font-medium h-8 text-center transition ripple focus:outline-none border-t border-b border-l border-gray-300 first:rounded-l last:rounded-r last:border-r',
            {
              'text-white bg-blue-500 shadow': x.selected === true,
              'text-gray-500 bg-white bg-transparent hover:bg-gray-100': x.selected === false,
            },
          )}
          disabled={disabled}
          onClick={() => onChange(x.id)}
        >
          {x.label}
        </button>
      ))}
    </div>
  )
}
