import { RichText } from '../types'
import { mdiNoteOutline } from '@mdi/js'
import { FaIcon } from '../FaIcon'
import { RichTextView } from '../RichTextView'
import React from 'react'
import { RichTextInputWithButtons } from '../Form/RichTextInputWithButtons/RichTextInputWithButtons'
import { Tooltip } from '../Tooltip/Tooltip'

export type Props = Readonly<{
  data?: RichText
  tooltip?: RichText
  disabled?: boolean
  disableRichText?: boolean
  hideToolbar?: boolean
  inputClassName?: string
  stopPropagation?: boolean
  onTextUpdate: (data: RichText) => void
}>

export function EditableRichTextWithTooltip({
  disabled,
  disableRichText,
  data,
  tooltip,
  hideToolbar,
  inputClassName,
  stopPropagation,
  onTextUpdate,
}: Props) {
  return (
    <div className="relative">
      <RichTextInputWithButtons
        disabled={disabled}
        disableRichText={disableRichText}
        data={data}
        onSave={onTextUpdate}
        hideToolbar={hideToolbar}
        inputClassName={inputClassName}
        stopPropagation={stopPropagation}
      />
      {tooltip && (
        <Tooltip
          tooltip={<RichTextView data={tooltip} />}
          className="-left-0.5 -top-2.5 w-4 h-4 absolute opacity-70 hover:opacity-100"
        >
          <FaIcon icon={mdiNoteOutline} />
        </Tooltip>
      )}
    </div>
  )
}
