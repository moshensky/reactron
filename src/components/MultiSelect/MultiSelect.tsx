import { MultiselectOptions } from './types'
import { Input } from './Input'
import { not } from '../utils'
import { Tags } from './Tags'
import { Container } from './Container'
import { Item } from './Item'
import { VirtualizedList } from '../VirtualizedList'
import { ActionType, useMultiselect } from './reducer'

type Props = Readonly<{
  initialSelected: MultiselectOptions
  options: MultiselectOptions
  invalid?: boolean
  disabled?: boolean
  onChange: (selected: MultiselectOptions) => void
}>

const toString =
  (xs: MultiselectOptions) =>
  (idx: number): string =>
    xs[idx].label

export function MultiSelect({
  initialSelected: selected,
  options,
  invalid,
  disabled,
  onChange,
}: Props) {
  const inputRef = React.createRef<HTMLInputElement>()
  const [state, dispatch] = useMultiselect(selected, options, onChange, disabled)

  React.useEffect(() => {
    if (inputRef.current) {
      state.isInputFocused ? inputRef.current.focus() : inputRef.current.blur()
    }
  }, [state.isInputFocused, inputRef])

  const handelOnRemoveTag = React.useCallback(
    (id: string) => dispatch({ type: ActionType.valueRemoved, id }),
    [dispatch],
  )

  const getValue = toString(state.filteredOptions)

  return (
    <Container
      isFocused={state.isInputFocused}
      dispatch={dispatch}
      invalid={invalid}
      disabled={disabled}
    >
      <Tags tags={state.selected} disabled={state.disabled} onRemoveTag={handelOnRemoveTag} />
      {not(state.disabled) && <Input ref={inputRef} value={state.inputValue} dispatch={dispatch} />}
      {state.isInputFocused && state.filteredOptions.length > 0 && (
        <div
          className="border rounded border-gray-300 bg-white absolute bg-clip-padding"
          style={{
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <VirtualizedList
            scrollToIndex={state.listHighlightedIndex || 0}
            applyMeasureDivStyle={() => ({
              padding: '0.25rem 1.1rem',
            })}
            itemToString={getValue}
            renderItem={({ index, style }) => (
              <Item
                text={getValue(index)}
                isActive={state.listHighlightedIndex === index}
                style={style}
                onMouseEnter={() => dispatch({ type: ActionType.listItemSelected, idx: index })}
                onClick={() => dispatch({ type: ActionType.valueSelected, idx: index })}
              />
            )}
            itemCount={state.filteredOptions.length}
          />
        </div>
      )}
    </Container>
  )
}
