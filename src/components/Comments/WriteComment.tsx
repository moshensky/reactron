import { isNotEmpty } from '../Form'
import React from 'react'
import { Tabs } from '../Tabs'
import { TextArea } from '../TextArea'
import { Button } from '../Buttons'

type Props = Readonly<{
  writeLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  commentLabel?: React.ReactNode
  defaultValue?: string
  onComment: (commentText: string) => void
  onCancel: () => void
}>

type State = Readonly<{
  commentText: string
}>

export class WriteComment extends React.Component<Props, State> {
  state: State = {
    commentText: this.props.defaultValue ? this.props.defaultValue : '',
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ commentText: event.target.value })
  }

  handleSubmit = () => {
    const { onCancel, onComment } = this.props
    const { commentText } = this.state

    if (isNotEmpty(commentText)) {
      onComment(commentText)
    } else {
      onCancel()
    }
  }

  render() {
    const { writeLabel, cancelLabel, commentLabel, onCancel } = this.props
    const { commentText } = this.state

    return (
      <div>
        <Tabs
          tabs={[
            {
              header: writeLabel || 'Write',
              content: (
                <div className="p-2">
                  <div>
                    <TextArea
                      value={commentText}
                      autoFocus
                      className="w-full"
                      rows={4}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex mt-2 mb-1">
                    <Button
                      onClick={onCancel}
                      className="ml-auto"
                      outline
                      variant="secondary"
                      label={cancelLabel || 'Cancel'}
                    />
                    <Button
                      onClick={this.handleSubmit}
                      className="ml-1"
                      variant="success"
                      label={commentLabel || 'Comment'}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    )
  }
}
