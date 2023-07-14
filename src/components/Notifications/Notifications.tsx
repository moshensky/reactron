import React from 'react'
import { UINotification } from '.'

type Props = {
  calculateRelativeTime: (date: Date) => string
  unreadNotificationsLabel?: React.ReactNode
  dismissAllLabel?: React.ReactNode
  readNotificationsLabel?: React.ReactNode
  noNotificationsToDisplayLabel?: React.ReactNode
  notifications: ReadonlyArray<UINotification>
  onDismiss: (id: string) => void
}

type SectionTitleProps = Readonly<{
  left: React.ReactNode
  right?: React.ReactNode
}>
const SectionTitle = ({ left, right }: SectionTitleProps) => (
  <div className="flex justify-between p-3">
    <h2 className="text-base font-semibold">{left}</h2>
    {right}
  </div>
)

export function Notifications({
  calculateRelativeTime,
  unreadNotificationsLabel,
  dismissAllLabel,
  readNotificationsLabel,
  noNotificationsToDisplayLabel,
  notifications,
  onDismiss,
}: Props) {
  const sortedNotifications = [...notifications].sort((a, b) => {
    // Sort by unread status first
    if (a.read && !b.read) {
      return 1
    } else if (!a.read && b.read) {
      return -1
    }

    // Sort by created date
    return a.createdAt.getTime() - b.createdAt.getTime()
  })

  const unreadNotifications = sortedNotifications.filter((notification) => !notification.read)
  const readNotifications = sortedNotifications.filter((notification) => notification.read)

  const handleDismissAll = () => {
    sortedNotifications.forEach((notification) => onDismiss(notification.id))
  }

  return (
    <div>
      {unreadNotifications.length > 0 && (
        <div>
          <SectionTitle
            left={unreadNotificationsLabel || 'Unread notifications'}
            right={
              <button
                className="ml-7 text-gray-500 hover:text-gray-700 focus:outline-none self-start underline"
                onClick={handleDismissAll}
              >
                {dismissAllLabel || 'Dismiss all'}
              </button>
            }
          />
          <div className="space-y-1">
            {unreadNotifications.map((notification) => (
              <UINotification
                key={notification.id}
                notification={notification}
                calculateRelativeTime={calculateRelativeTime}
                onDismiss={onDismiss}
              />
            ))}
          </div>
        </div>
      )}

      {readNotifications.length > 0 && (
        <div>
          <SectionTitle left={readNotificationsLabel || 'Read notifications last 24 hours'} />
          <div className="space-y-1">
            {readNotifications.map((notification) => (
              <UINotification
                key={notification.id}
                notification={notification}
                calculateRelativeTime={calculateRelativeTime}
                onDismiss={onDismiss}
              />
            ))}
          </div>
        </div>
      )}

      {sortedNotifications.length === 0 && (
        <p className="text-gray-500">
          {noNotificationsToDisplayLabel || 'No notifications to display'}
        </p>
      )}
    </div>
  )
}
