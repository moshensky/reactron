import { MemorySize } from '../../MemorySize'
import { RequiredSymbol } from '../../RequiredSymbol'

import { Field } from 'react-final-form'
import { ImagePreview } from './ImagePreview'

type Props = Readonly<{
  label: React.ReactNode
  name: string
  required?: boolean
  disabled?: boolean
}>

export function AddCropScaleImageField({ name, label, required, disabled }: Props) {
  return (
    <Field
      name={name}
      render={({ input: { value, onChange }, meta: { touched, error } }) => (
        <div className="form-group">
          <label>
            {label}
            {required && <RequiredSymbol />}
          </label>
          <div className="input-group">
            <ImagePreview invalid={error && touched} disabled={disabled} onChange={onChange} />
            {value && (
              <div className="ml-3">
                {value.name} (<MemorySize value={value.size} />)
              </div>
            )}
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
