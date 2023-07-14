import classNames from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import { ToggleButtonOptions, ToggleButton } from '../../Buttons'
import React from 'react'
import { Field } from 'react-final-form'

type Props = Readonly<{
  yesLabel?: React.ReactNode
  noLabel?: React.ReactNode
  name: string
  label?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}>

export function Bool({
  yesLabel,
  noLabel,
  name,
  label,
  required,
  disabled,
  className,
  style,
}: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => {
        const options: ToggleButtonOptions<boolean> = [
          { id: true, selected: value, label: yesLabel || 'Yes' },
          { id: false, selected: !value, label: noLabel || 'No' },
        ]

        return (
          <div className={classNames('mb-4', className)} style={style}>
            {label && (
              <label className="d-inline mb-1 whitespace-nowrap">
                {label}
                {required && <RequiredSymbol />}
              </label>
            )}
            <ToggleButton options={options} disabled={disabled} onChange={onChange} />
            <div
              className="invalid-feedback"
              style={{ display: error && touched ? 'block' : 'none' }}
            >
              {error}
            </div>
          </div>
        )
      }}
    />
  )
}
