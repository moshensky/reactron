import { MemorySize } from '../../MemorySize'
import { CropScaleImage } from '../../CropScaleImage'
import { FileImagePreview } from '../../FileImagePreview'

import { DropImage } from './DropImage'
import { useState } from 'react'

type Props = {
  invalid?: boolean
  disabled?: boolean
  onChange: (file: File) => void
}

type State =
  | Readonly<{
      type: 'selecting-image'
    }>
  | Readonly<{
      type: 'cropping'
      file: File
    }>
  | Readonly<{
      type: 'cropped'
      file: File
    }>

export function ImagePreview({ invalid, disabled, onChange }: Props): JSX.Element {
  const [state, setState] = useState<State>({
    type: 'selecting-image',
  })

  const onImageSelected = (file: File) => {
    setState({ type: 'cropping', file })
  }

  const onCrop = (file: File) => {
    setState({ type: 'cropped', file })
    onChange(file)
  }

  switch (state.type) {
    case 'selecting-image':
      return <DropImage invalid={invalid} disabled={disabled} onDrop={onImageSelected} />
    case 'cropping': {
      const { file } = state
      return <CropScaleImage file={file} maxWidth={2480} onCrop={onCrop} />
    }
    case 'cropped': {
      const { file } = state
      return (
        <div className="ml-3">
          {file.name} (<MemorySize value={file.size} />)
          <FileImagePreview file={file} />
        </div>
      )
    }
  }
}
