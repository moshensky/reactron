import { not } from '../../utils'

type Props = Readonly<{
  label: string
  disabled?: boolean
  onRemoveTag: React.MouseEventHandler
}>

export function Tag({ label, disabled, onRemoveTag }: Props) {
  return (
    <div className="inline-flex items-center px-1 rounded text-sm font-medium text-center transition ripple focus:outline-none border border-gray-300 text-white bg-blue-500 shadow">
      <div>{label}</div>
      {not(disabled) && (
        <button type="button" className="close ml-1" aria-label="Close" onClick={onRemoveTag}>
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  )
}
