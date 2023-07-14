import cn from 'classnames'

type Props = Readonly<{
  className?: string
  value?: string
  autoFocus?: boolean
  id?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  autoComplete?: string
  maxLength?: number
  invalid?: boolean
  onFocus?: () => void
  onBlur?: () => void
  type?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void
}>

export function Input({ className, invalid, ...rest }: Props) {
  return (
    <input
      type="text"
      className={cn('h-8 py-1 block shadow-sm sm:text-sm  rounded', className, {
        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !invalid,
        'border-red-300 focus:ring-red-500 focus:border-red-500': invalid,
        'text-gray-900 bg-gray-100': rest.disabled,
      })}
      {...rest}
    />
  )
}
