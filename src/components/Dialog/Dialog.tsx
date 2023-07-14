import { FluidDialog } from './FluidDialog'

const styles = {
  w1200h100p: {
    height: '100%',
    width: 1200,
  },
  w100ph100p: {
    height: '100%',
    width: '100%',
  },
}

export type Size = 'w1200h100p' | 'w100ph100p'

type Props = Readonly<{
  size: Size
  zIndex?: number
  header?: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
}>

export function Dialog({ size, ...rest }: Props) {
  return <FluidDialog style={styles[size]} {...rest} />
}
