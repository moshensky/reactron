import classNames from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import React from 'react'
import { Field } from 'react-final-form'
import { MultiselectOptions, MultiSelect as MultiSelectComp } from '../../MultiSelect'

type OuterProps = Readonly<{
  name: string
  label?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  options: MultiselectOptions
}>

type Props = OuterProps

export function MultiSelect({ name, label, required, disabled, className, style, options }: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => (
        <div className={classNames('form-group', className)} style={style}>
          {label && (
            <label className="whitespace-nowrap">
              {label}
              {required && <RequiredSymbol />}
            </label>
          )}
          <MultiSelectComp
            initialSelected={value || []}
            options={options}
            disabled={disabled}
            invalid={error && touched}
            onChange={onChange}
          />
          <div
            className="invalid-feedback"
            style={{ display: error && touched ? 'block' : 'none' }}
          >
            {error}
          </div>
        </div>
      )}
    />
  )
}
