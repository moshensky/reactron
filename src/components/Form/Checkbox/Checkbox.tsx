import { BoolView } from '../../BoolView'

import { Field } from 'react-final-form'

type Props = Readonly<{
  name: string
  label?: React.ReactNode
  disabled?: boolean
}>

export function Checkbox({ name, label, disabled }: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange } }) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (!!disabled == false) {
              onChange(!value)
            }
          }}
        >
          <div className="flex">
            <BoolView value={!!value} />
            {label && (
              <label
                className="ml-2"
                htmlFor={name}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                {label}
              </label>
            )}
          </div>
        </div>
      )}
    />
  )
}
