export type UINotification = Readonly<{
  id: string
  title: React.ReactNode
  description: React.ReactNode
  read: boolean
  createdAt: Date
  source: 'system'
  level: 'info' | 'warning' | 'danger' | 'success'
}>

const getTypeColor = ({ level }: UINotification) => {
  switch (level) {
    case 'info':
      return 'bg-blue-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'danger':
      return 'bg-red-500'
    case 'success':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

type Props = Readonly<{
  calculateRelativeTime: (date: Date) => React.ReactNode
  notification: UINotification
  dismissLabel?: React.ReactNode
  sourceLabel?: React.ReactNode
  onDismiss: (id: string) => void
}>

export function UINotification({
  calculateRelativeTime,
  dismissLabel,
  sourceLabel,
  notification,
  onDismiss,
}: Props): JSX.Element {
  const { id, title, description, createdAt, source, read } = notification

  const handleDismiss = () => {
    onDismiss(id)
  }

  return (
    <div className="flex h-full border border-gray-300 w-full max-w-md shadow-lg">
      <div className={`flex w-1 ${getTypeColor(notification)}`}></div>
      <div className="p-2 w-full">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold">{title}</span>
          {read === false && (
            <button
              className="ml-7 text-gray-500 hover:text-gray-700 focus:outline-none self-start underline"
              onClick={handleDismiss}
            >
              {dismissLabel || 'dismiss'}
            </button>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-700 mb-2">{description}</p>
          <p className="text-gray-500 text-sm flex justify-between ">
            <span>
              {sourceLabel || 'Source'}: {source}
            </span>
            <span className="ml-3">{calculateRelativeTime(createdAt)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
