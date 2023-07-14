import cn from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'
import { Field } from 'react-final-form'

export type RadioGroupOptions = ReadonlyArray<{
  label: string
  value: string | number
  disabled?: boolean
}>

type Props = Readonly<{
  label?: React.ReactNode
  name: string
  options: RadioGroupOptions
  required?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
}>

export function RadioGroup({
  label: fieldSetLabel,
  name,
  options,
  required,
  style,
  disabled,
  className,
}: Props) {
  return (
    <Field
      name={name}
      // commented out, because otherwise initial value is not populated
      // type="radio"
      render={({ input: { value: selectedValue, onChange }, meta: { touched, error } }) => (
        <div className={cn('form-group', className)} style={style}>
          {fieldSetLabel && (
            <label htmlFor={name}>
              {fieldSetLabel}
              {required && <RequiredSymbol />}
            </label>
          )}
          {options.map(({ label, value, disabled: disabledOption }, idx) => {
            const key = `${name}-${idx}`
            return (
              <div key={key}>
                <input
                  className={cn({ 'bg-gray-100': disabledOption || disabled })}
                  type="radio"
                  name={name}
                  id={key}
                  value={value}
                  disabled={disabledOption || disabled}
                  onChange={() => onChange(value)}
                  defaultChecked={selectedValue === value}
                  required={required}
                />
                <label
                  className={cn('ml-2', { 'text-gray-900': disabledOption || disabled })}
                  htmlFor={key}
                >
                  {label}
                </label>
              </div>
            )
          })}
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
