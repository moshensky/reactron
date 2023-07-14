import classNames from 'classnames'

type Props = Readonly<{
  children: React.ReactNode
  isActive: boolean
  isSelected: boolean
  style: React.CSSProperties
}>

export function Item({ children, isActive, isSelected, style, ...rest }: Props) {
  return (
    <div
      {...rest}
      style={style}
      className={classNames(
        'relative cursor-pointer block border-none h-auto text-left px-3 py-1',
        {
          'text-gray-900 bg-gray-100': isActive,
          'font-bold text-gray-900': isSelected,
        },
      )}
    >
      {children}
    </div>
  )
}
