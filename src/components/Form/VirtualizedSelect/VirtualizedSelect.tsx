import cn from 'classnames'
import { RequiredSymbol } from '../../RequiredSymbol'

import { Field } from 'react-final-form'
import { VirtualizedSelectElement } from './components/VirtualizedSelectElement'

type Props<T> = Readonly<{
  options: ReadonlyArray<T>
  keyName: keyof T
  name: string
  label: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  notClearable?: boolean
  style?: React.CSSProperties
  // TODO: fix make it work
  multiselect?: boolean
  itemToString: (item: T | null) => string
  placeholder?: string
}>

function mkOnChange<T>(onChange: (x: any) => void, keyName: keyof T, multiselect?: boolean) {
  return (x?: T | null) => {
    if (multiselect === true) {
      onChange(x ? [x[keyName]] : [])
    } else {
      onChange(x ? x[keyName] : undefined)
    }
  }
}

export function VirtualizedSelect<T>({
  name,
  label,
  options,
  required,
  disabled,
  className,
  notClearable,
  style,
  keyName,
  multiselect,
  itemToString,
  placeholder,
}: Props<T>) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => {
        const selectedItem = Number.isNaN(value)
          ? undefined
          : Array.isArray(value)
          ? value[0]
          : value
        return (
          <div className={cn('form-group', className)} style={style}>
            {label && (
              <label htmlFor={name}>
                {label}
                {required && <RequiredSymbol />}
              </label>
            )}
            <VirtualizedSelectElement<T>
              key={selectedItem}
              itemToString={itemToString}
              items={options as T[]}
              keyName={keyName}
              placeholder={placeholder}
              onChange={mkOnChange(onChange, keyName, multiselect)}
              selectedItem={selectedItem}
              disabled={disabled}
              notClearable={notClearable}
              invalid={error && touched}
            />
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
