import cn from 'classnames'

type Props = Readonly<{
  isOpen: boolean
  value: string
  disabled?: boolean
  invalid?: boolean
  rightPadding?: number
}>

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ isOpen, rightPadding, invalid, ...rest }, ref) => (
    <input
      {...rest}
      ref={ref}
      title={rest.value}
      className={cn(
        'h-8 py-1 block shadow-sm sm:text-sm rounded w-full whitespace-nowrap overflow-ellipsis overflow-hidden',
        {
          'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !invalid,
          'border-red-300 focus:ring-red-500 focus:border-red-500': invalid,
          'text-gray-900 bg-gray-100': rest.disabled,
          'rounded-b-none border-b-0': isOpen,
        },
      )}
      style={{
        ...(isOpen ? { zIndex: 1001 } : {}),
        paddingRight: rightPadding || 12,
      }}
      type="text"
    />
  ),
)
