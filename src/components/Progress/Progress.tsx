import classNames from 'classnames'

import './progress.css'

type Props = Readonly<{
  className?: string
  value: number
  color: 'info'
  animated?: boolean
}>

export function Progress({ className }: Props) {
  return (
    <div className={classNames('progress', className)}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated w-full"
        role="progressbar"
      ></div>
    </div>
  )
}
