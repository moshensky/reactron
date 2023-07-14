type Props = Readonly<{
  onClick: () => void
  right?: number
  children: React.ReactNode
}>

export const ControllerButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, right, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        position: 'absolute',
        right: right || 0,
        top: 0,
        cursor: 'pointer',
        // width: 47,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      type="button"
    >
      {children}
    </button>
  ),
)
