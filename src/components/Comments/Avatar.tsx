type Props = Readonly<{
  name: string
  avatar?: string
}>

const toUpperCaseAcronym = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((x) => x[0])
    .filter((x) => x === x.toUpperCase())
    .slice(0, 3)
    .join('')

const common = 'flex items-center justify-center rounded-full h-8 w-8'
export function Avatar({ name, avatar }: Props) {
  return avatar ? (
    <div className={common + ' '}>
      <img className="rounded-full" src={avatar} />
    </div>
  ) : (
    <div className={common + ' border bg-white rounded-full'}>{toUpperCaseAcronym(name)}</div>
  )
}
