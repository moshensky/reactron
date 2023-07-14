type Props = Readonly<{
  children?: React.ReactNode
}>

export function DialogBody({ children }: Props) {
  return <div className="p-4 relative flex-auto">{children}</div>
}
