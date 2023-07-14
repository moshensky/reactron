import { MultiselectOptions } from './types'
import { Tag } from './Tag'

type Props = Readonly<{
  tags: MultiselectOptions
  disabled?: boolean
  onRemoveTag: (id: string) => void
}>

export function Tags({ tags, disabled, onRemoveTag }: Props) {
  return tags.length === 0 ? (
    <div className="ml-1 mt-1">&nbsp;</div>
  ) : (
    <>
      {tags.map((x) => (
        <div className="ml-1 mt-1 rounded-sm flex items-center" key={x.id}>
          <Tag
            label={x.label}
            disabled={disabled}
            onRemoveTag={(e) => {
              e.stopPropagation()
              onRemoveTag(x.id)
            }}
          />
        </div>
      ))}
    </>
  )
}
