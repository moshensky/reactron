/**
 * NB! There are custom styles at styles.scss
 */
import React from 'react'
import { Field } from 'react-final-form'
import DatePicker, { getDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CustomDateTimeInput } from './CustomDateTimeInput'

type Props = Readonly<{
  label: React.ReactNode
  name: string
  timeCaption?: string
  required?: boolean
  className?: string
  wrapperClassName?: string
  disabled?: boolean
  placeholder?: string
}>

// TODO: check if ISO date
export const convert = (value: Date | string | undefined): Date | undefined => {
  return value === undefined || value === ''
    ? undefined
    : typeof value === 'string'
    ? new Date(value)
    : value
}

const mkDateTimeField =
  (dateFormat: string) =>
  ({
    name,
    label,
    required,
    className,
    wrapperClassName,
    disabled,
    timeCaption,
    placeholder,
  }: Props) =>
    (
      <Field<Date | undefined>
        name={name}
        render={({ input: { value, onChange }, meta: { touched, error } }) => (
          <div className={wrapperClassName}>
            <DatePicker
              required={required}
              disabled={disabled}
              className={className}
              selected={convert(value)}
              onChange={onChange}
              showTimeSelect
              // timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat={dateFormat}
              timeCaption={timeCaption}
              placeholderText={placeholder}
              customInput={
                <CustomDateTimeInput label={label} name={name} error={error} touched={touched} />
              }
            />
          </div>
        )}
      />
    )

export function DateTimeField(props: Props) {
  return mkDateTimeField(`${getDefaultLocale() === 'bg' ? 'dd.MM.yyyy' : 'P'} p`)(props)
}

export function DateField(props: Props) {
  return mkDateTimeField(getDefaultLocale() === 'bg' ? 'dd.MM.yyyy' : 'P')(props)
}
