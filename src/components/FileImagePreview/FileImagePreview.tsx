type Props = Readonly<{
  file: File
}>

type State = Readonly<{
  objectUrl: string
  name: string
}>

export class FileImagePreview extends React.Component<Props, State> {
  static getDerivedStateFromProps({ file }: Props, { objectUrl }: State): State | null {
    URL.revokeObjectURL(objectUrl)

    return {
      objectUrl: URL.createObjectURL(file),
      name: file.name,
    }
  }

  state: State = {
    objectUrl: URL.createObjectURL(this.props.file),
    name: this.props.file.name,
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.objectUrl)
  }

  render() {
    const { objectUrl, name } = this.state

    return <img className="rounded" src={objectUrl} title={name} style={{ width: '100%' }} />
  }
}
