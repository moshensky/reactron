import classNames from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import { SelectOptions } from '../../../types'
import { Field } from 'react-final-form'
import { SelectInput } from '../../SelectInput'

export type Props = Readonly<{
  options: SelectOptions
  name: string
  label: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}>

export function SelectField({ name, label, options, required, disabled, className, style }: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => (
        <div className={classNames('form-group', className)} style={style}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <RequiredSymbol />}
          </label>
          <div>
            <SelectInput
              options={options}
              disabled={disabled}
              value={value}
              invalid={error && touched}
              onChange={onChange}
            />
          </div>
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
