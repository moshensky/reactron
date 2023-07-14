import React, { useState } from 'react'
import cn from 'classnames'
import { useOnClickOutside } from '../hooks'
import { FaIcon } from '../FaIcon'
import { getOrElse, map, fromNullable } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import { mdiCheck, mdiChevronDown, mdiChevronUp } from '@mdi/js'
import { SelectOptions } from '../types'

type Props = Readonly<{
  className?: string
  options: SelectOptions
  value?: string
  empty?: React.ReactNode
  invalid?: boolean
  disabled?: boolean
  selectClassName?: string
  stopPropagation?: boolean
  onChange: (value: string) => void
}>

export function SelectInput({
  className,
  options,
  disabled,
  value,
  empty,
  invalid,
  selectClassName,
  stopPropagation,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const targetRef = React.createRef<HTMLDivElement>()
  useOnClickOutside(isOpen, [targetRef], () => setIsOpen(false))

  const opts: SelectOptions = empty ? [{ value: '', label: empty }, ...options] : options

  return (
    <div className={cn(className, 'relative')} ref={targetRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        className={cn(
          'h-8 py-1 relative w-full bg-white border rounded shadow-sm pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm',
          {
            'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !invalid,
            'border-red-300 focus:ring-red-500 focus:border-red-500': invalid,
            'text-gray-900 bg-gray-100': disabled,
          },
          selectClassName,
        )}
        onClick={(x) => {
          if (stopPropagation) {
            x.stopPropagation()
          }

          if (disabled !== true) {
            setIsOpen(!isOpen)
          }
        }}
      >
        <span className="flex items-center">
          {pipe(
            fromNullable(options.find((x) => x.value === `${value}`)),
            map((x) => x.label),
            getOrElse<React.ReactNode>(() => <>&nbsp;</>),
          )}
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FaIcon icon={isOpen ? mdiChevronUp : mdiChevronDown} size="1.25rem" />
        </span>
      </button>

      {/**
       * Select popover, show/hide based on select state.
       * Entering: ""
       *   From: ""
       *   To: ""
       * Leaving: "transition ease-in duration-100"
       *   From: "opacity-100"
       *   To: "opacity-0"
       */}
      {isOpen && (
        <div className="absolute mt-1 w-full rounded bg-white shadow-lg z-1000">
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-56 rounded py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {opts.map((x, idx) => {
              const isSelected = x.value === value
              /**
               * Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
               * Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
               */
              return (
                <li
                  key={idx}
                  role="option"
                  className="text-gray-900 hover:bg-indigo-600 hover:text-white cursor-default select-none relative py-2 pl-3 pr-9"
                  onClick={(ev) => {
                    if (stopPropagation) {
                      ev.stopPropagation()
                    }
                    onChange(x.value)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    {/* <span className={`block ${isSelected ? 'font-semibold' : 'font-normal'}}`} > {x.label} </span> */}
                    <span className="block 'font-normal">{x.label}</span>
                  </div>

                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <FaIcon icon={mdiCheck} />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
