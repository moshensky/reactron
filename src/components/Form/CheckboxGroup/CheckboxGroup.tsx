import { Field } from 'react-final-form'

export type CheckboxGroupOptions = ReadonlyArray<{
  label: React.ReactNode
  name: string
  disabled?: boolean
}>

type Props = Readonly<{
  options: CheckboxGroupOptions
  className?: string
  disabled?: boolean
}>

export function CheckboxGroup({ options, className, disabled: disableAll }: Props) {
  return (
    <div className={`form-group ${className}`}>
      {options.map(({ label, name, disabled }) => (
        <Field
          key={name}
          name={name}
          type="checkbox"
          render={({ input: { value, onChange } }) => (
            <div className="form-check">
              <input
                disabled={disabled || disableAll}
                checked={!!value}
                onChange={onChange}
                className="form-check-input"
                type="checkbox"
                id={name}
              />
              <label className="form-check-label" htmlFor={name}>
                {label}
              </label>
            </div>
          )}
        />
      ))}
    </div>
  )
}
