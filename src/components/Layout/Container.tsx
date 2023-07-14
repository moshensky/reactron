type Props = Readonly<{
  children: React.ReactNode
}>

export function Container({ children }: Props) {
  return <div className="bg-gray-100">{children}</div>
}
