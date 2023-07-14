import { CardFooter } from '../Card'
import { Input } from '../Input'
import { Avatar } from './Avatar'

type Props = Readonly<{
  name: string
  avatar?: string
  onFocus: () => void
}>

export function WriteCommentStub({ name, avatar, onFocus }: Props) {
  return (
    <CardFooter className="flex">
      <div>
        <Avatar name={name} avatar={avatar} />
      </div>
      <Input className="ml-2 w-full p-0" onFocus={onFocus} />
    </CardFooter>
  )
}
