import { FaIcon } from '../FaIcon'
import { Avatar } from './Avatar'
import { mdiDotsHorizontal, mdiLeadPencil, mdiTrashCanOutline } from '@mdi/js'
import { Popover } from '../Popover'
import { Button } from '../Buttons'

type Props = Readonly<{
  calculateRelativeTime: (date: Date) => React.ReactNode
  editLabel?: React.ReactNode
  deleteLabel?: React.ReactNode
  name: string
  avatar?: string
  text: string
  createdAt: Date
  updatedAt: Date | null
  onEditComment: () => void
  onDeleteComment: () => void
}>

export function Comment({
  calculateRelativeTime,
  editLabel,
  deleteLabel,
  name,
  createdAt,
  updatedAt,
  avatar,
  text,
  onEditComment,
  onDeleteComment,
}: Props) {
  return (
    <div className="flex">
      <div className="mr-2">
        <Avatar name={name} avatar={avatar} />
      </div>

      <div className="flex-grow">
        <div className="flex mb-2">
          <strong>{name}</strong>
          <div className="text-gray-500 ml-1">{calculateRelativeTime(updatedAt ?? createdAt)}</div>
          <div className="ml-auto">
            <Popover
              trigger={(show) => (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    show()
                  }}
                >
                  <FaIcon icon={mdiDotsHorizontal} />
                </a>
              )}
              body={(hide) => (
                <>
                  <Button
                    variant="danger"
                    outline
                    onClick={() => {
                      onDeleteComment()
                      hide()
                    }}
                    icon={mdiTrashCanOutline}
                    label={deleteLabel || 'Delete'}
                  />
                  <Button
                    className="ml-1"
                    variant="secondary"
                    outline
                    onClick={() => {
                      onEditComment()
                      hide()
                    }}
                    icon={mdiLeadPencil}
                    label={editLabel || 'Edit'}
                  />
                </>
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <div>{text}</div>
        </div>
      </div>
    </div>
  )
}
