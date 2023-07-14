import cn from 'classnames'
import { Button } from '../Buttons'

import { Field, Form } from 'react-final-form'
import { isNil, not } from '../../utils'
import { mdiContentSaveOutline, mdiLeadPencil } from '@mdi/js'

type Props = Readonly<{
  text?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  multiline?: boolean
  rows?: number
  onSave: (text: string) => void
}>

export function TextInputWithButtons({
  text,
  onSave,
  placeholder,
  className,
  inputClassName,
  disabled,
  multiline,
  rows,
}: Props) {
  return (
    <Form
      onSubmit={(values: any) => onSave(values.text)}
      initialValues={{
        text,
        isInEditMode: isNil(text),
      }}
      render={({ handleSubmit, values }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const inputCN = cn(
          'bg-clip-padding border rounded border-gray-300 rounded-r-none',
          {
            'text-gray-500 bg-gray-100': not(values.isInEditMode),
          },
          inputClassName,
        )
        return (
          <form onSubmit={handleSubmit} noValidate className={cn(className, 'w-full')}>
            <div className="flex ">
              <Field
                name="text"
                render={({ input: { value, onChange } }) =>
                  // TODO: add tests for multiline
                  multiline ? (
                    <textarea
                      // id={name}
                      className={inputCN}
                      disabled={not(values.isInEditMode) || disabled}
                      value={value}
                      onChange={onChange}
                      rows={rows || 2}
                      placeholder={placeholder}
                    />
                  ) : (
                    <input
                      className={inputCN}
                      disabled={not(values.isInEditMode) || disabled}
                      value={value}
                      onChange={onChange}
                      type="text"
                      placeholder={placeholder}
                    />
                  )
                }
              />
              <Field
                name="isInEditMode"
                render={({ input: { value, onChange } }) =>
                  value ? (
                    <Button
                      className="rounded-l-none h-auto"
                      outline
                      variant="success"
                      disabled={disabled}
                      onClick={() => {
                        onChange(false)
                        handleSubmit()
                      }}
                      icon={mdiContentSaveOutline}
                    />
                  ) : (
                    <Button
                      className="rounded-l-none h-auto"
                      disabled={disabled}
                      outline
                      variant="secondary"
                      onClick={() => onChange(true)}
                      icon={mdiLeadPencil}
                    />
                  )
                }
              />
            </div>
          </form>
        )
      }}
    />
  )
}
