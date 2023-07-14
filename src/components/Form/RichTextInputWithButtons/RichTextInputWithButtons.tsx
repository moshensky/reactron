import cn from 'classnames'
import { Button } from '../../Buttons'
import { RichTextControlled } from '../../RichTextControlled'
import { RichTextView } from '../../RichTextView'
import React, { useState } from 'react'
import { not } from '../../utils'
import { isRichTextEmpty, RichText } from '../../../types'
import { mdiContentSaveOutline, mdiLeadPencil } from '@mdi/js'

type Props = Readonly<{
  data?: RichText
  onSave: (data: RichText) => void
  disabled?: boolean
  hideToolbar?: boolean
  disableRichText?: boolean
  inputClassName?: string
  stopPropagation?: boolean
}>

export function RichTextInputWithButtons({
  data,
  onSave,
  disabled,
  disableRichText,
  hideToolbar,
  inputClassName,
  stopPropagation,
}: Props) {
  const [value, setValue] = useState(data || [])
  const [isInEditMode, setIsInEditMode] = useState(isRichTextEmpty(data || []))
  return (
    <div className="flex border rounded border-gray-300">
      {not(isInEditMode) || disabled ? (
        <RichTextView
          data={value}
          className={cn(
            'flex items-center h-auto px-3 py-1 bg-gray-100 bg-clip-padding text-gray-500',
            inputClassName,
          )}
        />
      ) : (
        <div className={cn('h-auto px-3 py-2', inputClassName)}>
          <RichTextControlled
            value={value}
            disabled={disabled}
            hideToolbar={hideToolbar}
            disableRichText={disableRichText}
            stopPropagation
            onChange={(x) => {
              setValue(x as unknown as RichText)
            }}
          />
        </div>
      )}
      {isInEditMode ? (
        <Button
          className="rounded-l-none h-auto"
          outline
          variant="success"
          disabled={isRichTextEmpty(value) || disabled}
          stopPropagation={stopPropagation}
          onClick={() => {
            setIsInEditMode(false)
            onSave(value)
          }}
          icon={mdiContentSaveOutline}
        />
      ) : (
        <Button
          className="rounded-l-none h-auto"
          disabled={disabled}
          outline
          variant="secondary"
          stopPropagation={stopPropagation}
          onClick={() => setIsInEditMode(true)}
          icon={mdiLeadPencil}
        />
      )}
    </div>
  )
}
