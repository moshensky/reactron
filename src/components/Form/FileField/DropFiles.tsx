import { useDropzone } from 'react-dropzone'
import cn from 'classnames'

type Props = {
  dropFilesHereLabel?: React.ReactNode
  dragAndDropFilesHereLabel?: React.ReactNode
  invalid?: boolean
  disabled?: boolean
  onDrop: (files: ReadonlyArray<File>) => void
}

export function DropFiles({
  dropFilesHereLabel,
  dragAndDropFilesHereLabel,
  invalid,
  disabled,
  onDrop,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ disabled, onDrop })

  return (
    <div
      {...getRootProps()}
      className={cn('h-48 w-48 relative border-2 rounded border-dashed', {
        'border-gray-300': !invalid,
        'border-red-300': invalid,
        'text-gray-900 bg-gray-100': disabled,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="p-2">{dropFilesHereLabel || 'Drop the files here ...'}</p>
      ) : (
        <p className="p-2">
          {dragAndDropFilesHereLabel || 'Drag and drop some files here, or click to select files'}
        </p>
      )}
    </div>
  )
}
