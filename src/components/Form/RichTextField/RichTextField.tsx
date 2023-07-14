import cn from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import { RichTextControlled } from '../../RichTextControlled'

import { Field } from 'react-final-form'
import { RichText as RichTextT } from '../../../types'

type Props = Readonly<{
  className?: string
  label?: React.ReactNode
  help?: React.ReactNode
  name: string
  required?: boolean
  disabled?: boolean
  disableRichText?: boolean
  style?: React.CSSProperties
  singleLine?: boolean
  suggestions?: RichTextT[]
}>

export function RichTextField({
  name,
  label,
  help,
  required,
  disabled,
  style,
  className,
  disableRichText,
  singleLine,
  suggestions,
}: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => (
        <div className={cn('form-group', className)} style={style}>
          {label && (
            <label htmlFor={name}>
              {label}
              {required && <RequiredSymbol />}
            </label>
          )}
          <RichTextControlled
            onChange={onChange}
            value={value}
            className={cn('px-3 py-1 rounded border bg-white', {
              'border-gray-300': !(error && touched),
              'border-red-300 invalid': error && touched,
              'text-gray-900 bg-gray-100': disabled,
              // TODO:
              // 'lw-div-input': isFocused,
            })}
            disabled={disabled}
            disableRichText={disableRichText}
            singleLine={singleLine}
            suggestions={suggestions}
          />
          <div
            className="invalid-feedback"
            style={{ display: error && touched ? 'block' : 'none' }}
          >
            {error}
          </div>
          {help && (
            <small id={name} className="form-text text-muted">
              {help}
            </small>
          )}
        </div>
      )}
    />
  )
}
