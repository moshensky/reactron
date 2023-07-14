import React from 'react'
import { useDropzone } from 'react-dropzone'
import cn from 'classnames'

type Props = {
  dropFileHereLabel?: React.ReactNode
  dragAndDropFileHereLabel?: React.ReactNode
  acceptedFileFormatsLabel?: React.ReactNode
  invalid?: boolean
  disabled?: boolean
  onDrop: (file: File) => void
}

export function DropImage({
  dropFileHereLabel,
  dragAndDropFileHereLabel,
  acceptedFileFormatsLabel,
  invalid,
  disabled,
  onDrop,
}: Props) {
  const onImageSelected = (accepted: ReadonlyArray<File>) => {
    onDrop(accepted[0])
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    disabled,
    onDrop: onImageSelected,
  })

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
        <p className="p-2">{dropFileHereLabel || 'Drop the file here ...'}</p>
      ) : (
        <>
          <p className="p-2">
            {dragAndDropFileHereLabel || 'Drag and drop a file here, or click to select a file'}
          </p>
          <p className="p-2">
            {acceptedFileFormatsLabel || 'Only *.jpeg or *.png formats are accepted.'}
          </p>
        </>
      )}
    </div>
  )
}
