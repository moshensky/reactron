import { mdiScissorsCutting } from '@mdi/js'
import { Button } from '../Buttons'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { Component } from 'react'

export type CropperState = 'initializing' | 'initialized' | 'processing'

type Props = Readonly<{
  cropLabel?: React.ReactNode
  file: File
  maxWidth?: number
  onCrop: (file: File) => void
  onStateChange?: (state: CropperState) => void
}>

type State = Readonly<{
  cropperState: CropperState
}>

const imgStyle = { maxWidth: '100%' }

const scaleImage = (canvas: HTMLCanvasElement, maxWidth: number): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (maxWidth < imageData.width) {
      const scaledCanvas = document.createElement('canvas')
      const height = imageData.height / (canvas.width / maxWidth)
      scaledCanvas.width = maxWidth
      scaledCanvas.height = height
      const ctx2 = scaledCanvas.getContext('2d')
      if (ctx2) {
        ctx2.drawImage(canvas, 0, 0, maxWidth, height)
        return scaledCanvas
      }
    }
  }

  return canvas
}

export class CropScaleImage extends Component<Props, State> {
  objectUrl = URL.createObjectURL(this.props.file)

  img: HTMLImageElement | null = null
  cropper: Cropper | null = null

  state: State = {
    cropperState: 'initializing',
  }

  componentDidMount() {
    this.initCropper()
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.objectUrl)
    if (this.cropper) {
      this.cropper.destroy()
    }
  }

  imgRef = (el: HTMLImageElement | null) => {
    this.img = el
  }

  updateCropperState = (cropperState: CropperState) => {
    this.setState({ cropperState })
    if (this.props.onStateChange) {
      this.props.onStateChange(cropperState)
    }
  }

  initCropper = () => {
    if (this.img) {
      this.cropper = new Cropper(this.img, {
        ready: () => {
          this.updateCropperState('initialized')
        },
      })
    }
  }

  crop = () => {
    const { maxWidth } = this.props
    this.updateCropperState('processing')
    if (this.cropper) {
      const c = this.cropper.getCroppedCanvas()
      const canvas = maxWidth ? scaleImage(c, maxWidth) : c

      canvas.toBlob(
        (blob) => {
          this.updateCropperState('initialized')
          if (blob) {
            const file = new File([blob], this.props.file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            this.props.onCrop(file)
          }
        },
        'image/jpeg',
        0.9,
      )
    }
  }

  render() {
    const { file, cropLabel } = this.props
    const { cropperState } = this.state

    return (
      <div>
        <div>
          <img ref={this.imgRef} src={this.objectUrl} title={file.name} style={imgStyle} />
        </div>
        <div className="flex mt-3">
          <Button
            disabled={cropperState !== 'initialized'}
            onClick={this.crop}
            type="submit"
            className="ml-auto"
            variant="primary"
            label={cropLabel || 'Crop'}
            icon={mdiScissorsCutting}
          />
        </div>
      </div>
    )
  }
}
