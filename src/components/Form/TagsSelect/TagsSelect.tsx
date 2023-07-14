import classNames from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import React from 'react'
import { Field } from 'react-final-form'
import { MultiSelect, MultiselectOption } from '../../MultiSelect'

type OuterProps = Readonly<{
  name: string
  label?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  options: ReadonlyArray<string>
}>

type Props = OuterProps

const toOption = (x: string): MultiselectOption => ({ label: x, id: x })

export function TagsSelect({ name, label, required, disabled, className, style, options }: Props) {
  const opts = options.map(toOption)
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
          <MultiSelect
            initialSelected={(value || []).map(toOption)}
            options={opts}
            invalid={error && touched}
            disabled={disabled}
            onChange={(selected) => onChange(selected.map((x) => x.id))}
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
