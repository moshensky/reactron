import { FaIcon } from '../../../FaIcon'
import { VirtualizedList } from '../../../VirtualizedList'
import { useCombobox, UseComboboxState } from 'downshift'
import { matchSorter } from 'match-sorter'

import { ControllerButton, Input, Item } from './index'
import { mdiChevronDown, mdiChevronUp, mdiClose } from '@mdi/js'
import './VirtualizedSelect.css'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import React from 'react'

type VirtualizedSelectElementProps<T> = Readonly<{
  items: T[]
  keyName: keyof T
  placeholder?: string
  // TODO: fixme, where this is T[keyName]
  selectedItem?: any
  invalid?: boolean
  disabled?: boolean
  notClearable?: boolean
  itemToString: (item: T | null) => string
  onChange: (item?: T | null) => void
}>

const filterItems = <T extends object>(allItems: T[], inputValue: string | null | undefined): T[] =>
  inputValue
    ? matchSorter(allItems, inputValue, {
        // FIXME: specify that T must have a name or generalize it
        keys: ['name'],
      })
    : allItems

// const stateReducer = <T extends {}>(
//   _state: UseComboboxState<T>,
//   actionAndChanges: UseComboboxStateChangeOptions<T>,
// ): UseComboboxState<T> => {
//   console.log(actionAndChanges)
//   return actionAndChanges.changes
// }

export function VirtualizedSelectElement<T>({
  items,
  itemToString,
  keyName,
  placeholder,
  selectedItem,
  invalid,
  disabled,
  notClearable,
  onChange,
}: VirtualizedSelectElementProps<T>): JSX.Element {
  const [filteredItems, setFilteredItems] = React.useState<T[]>(items)
  React.useEffect(() => setFilteredItems(items), [items])
  const {
    isOpen,
    getComboboxProps,
    getToggleButtonProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    getMenuProps,
    reset,
  } = useCombobox<T>({
    items: filteredItems,
    itemToString,
    initialSelectedItem: pipe(
      O.fromNullable(selectedItem),
      O.map((x) => filteredItems.find((y) => (y[keyName] as unknown) === x)),
      O.toUndefined,
    ),
    // TODO: throttle when list is too big
    onInputValueChange: ({ inputValue, isOpen, selectedItem }) => {
      // Reset filter when item is selected
      if (isOpen === false && selectedItem && itemToString(selectedItem) === inputValue) {
        setFilteredItems(items)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFilteredItems(filterItems(items, inputValue))
      }
    },
    onSelectedItemChange: (changes: Partial<UseComboboxState<T>>) => {
      onChange(changes.selectedItem)
    },
  })

  const input = (
    <Input
      isOpen={isOpen}
      disabled={disabled}
      invalid={invalid}
      rightPadding={disabled ? undefined : notClearable ? 30 : 55}
      placeholder={placeholder ? placeholder : undefined}
      {...getInputProps()}
      // Un-comment when developing in order for the list not to hide
      // ref={undefined}
    />
  )

  const buttons = disabled ? null : (
    <>
      {selectedItem && !notClearable && (
        <ControllerButton onClick={reset} aria-label="clear selection" right={30}>
          <FaIcon icon={mdiClose} />
        </ControllerButton>
      )}
      <ControllerButton {...getToggleButtonProps()} right={4}>
        <FaIcon icon={isOpen ? mdiChevronUp : mdiChevronDown} size="1.25rem" />
      </ControllerButton>
    </>
  )

  return (
    <div className="relative">
      <div className="relative" {...getComboboxProps()}>
        {input}
        {buttons}
      </div>
      <div {...getMenuProps()}>
        {!isOpen || !filteredItems.length ? null : (
          <div
            className="lw-div-input absolute left-0 right-0 border rounded bg-white border-t-0 rounded-t-none z-1000"
            {...getMenuProps()}
          >
            <VirtualizedList
              scrollToIndex={highlightedIndex || 0}
              itemToString={(idx) => itemToString(filteredItems[idx])}
              height={300}
              itemCount={filteredItems.length}
              applyMeasureDivStyle={() => ({
                padding: '0.25rem 1.1rem',
              })}
              renderItem={({ index, style }) => {
                const item = filteredItems[index]
                return (
                  <Item
                    {...getItemProps({
                      item,
                      index,
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      key: `${item[keyName]}`,
                      style,
                      isSelected: selectedItem === item[keyName],
                    })}
                    isActive={highlightedIndex === index}
                    ref={undefined}
                  >
                    {itemToString(item)}
                  </Item>
                )
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
