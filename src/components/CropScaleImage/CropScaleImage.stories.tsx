import { MemorySize } from '../MemorySize'
import { dataURLtoFile } from '../../utils'
import { CropperState, CropScaleImage } from './CropScaleImage'
import { testBase64ImageData } from './test-base64-image-data'
import React from 'react'

type Props = object

type State = Readonly<{
  croppedObjectUrl?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  croppedBlob?: any
  cropperState: CropperState
}>

export class TestCropScaleImage extends React.Component<Props, State> {
  state: State = {
    cropperState: 'initializing',
  }

  componentWillUnmount() {
    const { croppedObjectUrl: cropObjectUrl } = this.state
    if (cropObjectUrl) {
      URL.revokeObjectURL(cropObjectUrl)
    }
  }

  onCrop = (file: File) => {
    this.setState({
      croppedObjectUrl: URL.createObjectURL(file),
      croppedBlob: file,
    })
  }

  onCropperStateChange = (cropperState: CropperState) => {
    this.setState({ cropperState })
  }

  render() {
    const { croppedObjectUrl, croppedBlob, cropperState } = this.state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const size = croppedBlob.size

    return (
      <>
        <CropScaleImage
          file={dataURLtoFile(testBase64ImageData, 'image 1')}
          maxWidth={2480}
          onCrop={this.onCrop}
          onStateChange={this.onCropperStateChange}
        />
        <br />
        Cropper state: {cropperState}
        <br />
        {croppedObjectUrl && cropperState === 'initialized' && (
          <>
            <MemorySize value={size} />
            <img className="rounded" src={croppedObjectUrl} style={{ maxWidth: '100%' }} />
          </>
        )}
        <br />
      </>
    )
  }
}

export default {
  title: 'common/CropScaleImage',
  excludeStories: ['TestCropScaleImage'],
}

export const Default = () => <TestCropScaleImage />

Default.story = {
  name: 'default',
  parameters: { loki: { skip: true } },
}
