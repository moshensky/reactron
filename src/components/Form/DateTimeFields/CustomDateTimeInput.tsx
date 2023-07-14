import cn from 'classnames'
import { mdiCalendarClock } from '@mdi/js'
import { Button } from '../../Buttons'
import { Input } from '../../Input'
import { RequiredSymbol } from '../../RequiredSymbol'
import React, { forwardRef } from 'react'

type Props = Readonly<{
  label: React.ReactNode
  name: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  error?: string
  touched?: boolean
  onClick?: () => void
  value?: string
  className?: string
}>

// React.forwardRef used to suppress warning: Function components cannot be given refs.
export const CustomDateTimeInput = forwardRef(
  (
    { className, label, required, name, disabled, placeholder, error, touched, ...rest }: Props,
    _ref,
  ) => {
    return (
      <div className={cn('form-group', className)}>
        <label htmlFor={name}>
          {label}
          {required && <RequiredSymbol />}
        </label>
        <div className="flex">
          <Input
            placeholder={placeholder}
            disabled={disabled}
            maxLength={100}
            {...rest}
            className="border-r-0 rounded-r-none"
            invalid={!!error && !!touched}
            id={name}
          />
          <Button
            className="rounded rounded-l-none h-auto"
            outline
            variant="secondary"
            disabled={disabled}
            // style={{ zIndex: 0 }}
            onClick={rest.onClick}
            icon={mdiCalendarClock}
          />
        </div>
        <div className="invalid-feedback" style={{ display: error && touched ? 'block' : 'none' }}>
          {error}
        </div>
      </div>
    )
  },
)
