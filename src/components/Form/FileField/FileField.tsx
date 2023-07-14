import { MemorySize } from '../../MemorySize'
import { RequiredSymbol } from '../../RequiredSymbol'

import { Field } from 'react-final-form'
import { DropFiles } from './DropFiles'

type Props = Readonly<{
  label: React.ReactNode
  name: string
  required?: boolean
  disabled?: boolean
  append?: (files: ReadonlyArray<File>) => React.ReactNode
}>

export function FileField({ name, label, required, disabled, append }: Props) {
  return (
    <Field<ReadonlyArray<File>>
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => (
        <div className="form-group">
          <label>
            {label}
            {required && <RequiredSymbol />}
          </label>
          <div className="input-group">
            <div>
              <DropFiles onDrop={onChange} disabled={disabled} invalid={error && touched} />
            </div>
            <div className="flex justify-between flex-col ml-3">
              <ul className="space-y-1">
                {value &&
                  value.map((x: File) => (
                    <li key={x.name} className="flex justify-between items-center">
                      {x.name}
                      <MemorySize value={x.size} />
                    </li>
                  ))}
              </ul>
              <div>{append && append(value)}</div>
            </div>
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
