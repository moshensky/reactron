import classNames from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import { ToggleButtonOptions, ToggleButton } from '../../Buttons'
import React from 'react'
import { Field } from 'react-final-form'

export type BoolWithAllType = 'yes' | 'no' | 'all'

export const BoolWithAllType = {
  toBoolean: (value: unknown): boolean | undefined => {
    switch (value) {
      case 'all':
        return undefined
      case 'yes':
        return true
      case 'no':
        return false
      default:
        return undefined
    }
  },
  of: (value?: boolean): BoolWithAllType => {
    switch (value) {
      case undefined:
        return 'all'
      case true:
        return 'yes'
      case false:
        return 'no'
    }
  },
}

type Props = Readonly<{
  yesLabel?: React.ReactNode
  noLabel?: React.ReactNode
  allLabel?: React.ReactNode
  name: string
  label: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
}>

export function BoolWithAll({
  yesLabel,
  noLabel,
  allLabel,
  name,
  label,
  required,
  disabled,
  className,
}: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => {
        const options: ToggleButtonOptions<'yes' | 'no' | 'all'> = [
          { id: 'yes', selected: value === 'yes', label: yesLabel || 'Yes' },
          { id: 'all', selected: value === 'all', label: allLabel || 'All' },
          { id: 'no', selected: value === 'no', label: noLabel || 'No' },
        ]

        return (
          <div className={classNames('form-group', className)}>
            <label className="whitespace-nowrap">
              {label}
              {required && <RequiredSymbol />}
            </label>
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
