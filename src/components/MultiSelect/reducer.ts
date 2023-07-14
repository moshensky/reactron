import { matchSorter } from 'match-sorter'
import { MultiselectOptions } from './types'

export enum ActionType {
  optionsChanged = 'optionsChanged',
  disabledChanged = 'disabledChanged',
  inputValueChanged = 'inputValueChanged',
  valueSelected = 'valueSelected',
  highlightedValueSelected = 'highlightedValueSelected',
  valueRemoved = 'valueRemoved',
  inputFocused = 'inputFocused',
  inputBlurred = 'inputBlurred',
  listItemSelected = 'listItemSelected',
  prevListItemSelected = 'prevListItemSelected',
  nextListItemSelected = 'nextListItemSelected',
}

export type Action =
  | {
      type: ActionType.optionsChanged
      options: MultiselectOptions
    }
  | {
      type: ActionType.disabledChanged
      disabled?: boolean
    }
  | {
      type: ActionType.inputValueChanged
      value: string
    }
  | {
      type: ActionType.valueSelected
      idx: number
    }
  | {
      type: ActionType.highlightedValueSelected
    }
  | {
      type: ActionType.valueRemoved
      id: string
    }
  | {
      type: ActionType.inputFocused
    }
  | {
      type: ActionType.inputBlurred
    }
  | {
      type: ActionType.listItemSelected
      idx: number
    }
  | {
      type: ActionType.prevListItemSelected
    }
  | {
      type: ActionType.nextListItemSelected
    }

export type State = Readonly<{
  selected: MultiselectOptions
  options: MultiselectOptions
  filteredOptions: MultiselectOptions
  inputValue: string
  listHighlightedIndex: number
  isInputFocused: boolean
  disabled?: boolean
  onChange: (selected: MultiselectOptions) => void
}>

export const filter = (
  selected: MultiselectOptions,
  options: MultiselectOptions,
  value: string,
): MultiselectOptions =>
  matchSorter(options, value, {
    keys: ['label'],
  }).filter((x) => !selected.some((y) => x.id === y.id))

export function multiSelectReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.optionsChanged: {
      return {
        ...state,
        options: action.options,
      }
    }
    case ActionType.disabledChanged: {
      return {
        ...state,
        disabled: action.disabled,
        isInputFocused: action.disabled ? false : state.isInputFocused,
      }
    }
    case ActionType.inputValueChanged: {
      const { value } = action
      return {
        ...state,
        inputValue: value,
        filteredOptions: filter(state.selected, state.options, value),
        listHighlightedIndex: 0,
      }
    }
    case ActionType.valueSelected: {
      const { idx } = action
      if (idx < 0 || idx > state.filteredOptions.length - 1) {
        return state
      }
      const selected = state.selected.concat(state.filteredOptions[idx])
      state.onChange(selected)

      return {
        ...state,
        selected,
        inputValue: '',
        listHighlightedIndex: -1,
        isInputFocused: false,
      }
    }
    case ActionType.highlightedValueSelected: {
      const selectedOption = state.filteredOptions[state.listHighlightedIndex]
      if (selectedOption === undefined) {
        return {
          ...state,
          inputValue: '',
          listHighlightedIndex: -1,
          isInputFocused: false,
        }
      }

      const selected = state.selected.concat(selectedOption)
      state.onChange(selected)

      return {
        ...state,
        selected,
        inputValue: '',
        listHighlightedIndex: -1,
        isInputFocused: false,
      }
    }
    case ActionType.valueRemoved: {
      const selected = state.selected.filter((x) => x.id !== action.id)
      state.onChange(selected)

      return {
        ...state,
        selected,
        isInputFocused: false,
      }
    }
    case ActionType.inputFocused: {
      if (state.disabled) {
        return state
      }

      return {
        ...state,
        isInputFocused: true,
        filteredOptions: filter(state.selected, state.options, state.inputValue),
      }
    }
    case ActionType.inputBlurred: {
      return {
        ...state,
        isInputFocused: false,
      }
    }
    case ActionType.listItemSelected: {
      const itemsCount = state.filteredOptions.length
      const { idx } = action
      return state.isInputFocused && itemsCount > 0 && idx >= 0 && idx < itemsCount
        ? {
            ...state,
            listHighlightedIndex: idx,
          }
        : state
    }
    case ActionType.prevListItemSelected: {
      if (state.isInputFocused && state.filteredOptions.length > 0) {
        return {
          ...state,
          listHighlightedIndex:
            state.listHighlightedIndex <= 0
              ? state.filteredOptions.length - 1
              : state.listHighlightedIndex - 1,
        }
      }

      return state
    }
    case ActionType.nextListItemSelected: {
      if (state.isInputFocused && state.filteredOptions.length > 0) {
        return {
          ...state,
          listHighlightedIndex:
            state.listHighlightedIndex >= state.filteredOptions.length - 1
              ? 0
              : state.listHighlightedIndex + 1,
        }
      }

      return state
    }
  }
}

export function multiSelectReducerWithLog(state: State, action: Action): State {
  console.group(action.type)
  console.info('dispatching', action)
  const result = multiSelectReducer(state, action)
  console.log('next state', result)
  console.groupEnd()

  return result
}

export function useMultiselect(
  initialSelected: MultiselectOptions,
  options: MultiselectOptions,
  onChange: (selected: MultiselectOptions) => void,
  disabled?: boolean,
) {
  // const reducer = React.useReducer(multiSelectReducerWithLog, {
  const reducer = React.useReducer(multiSelectReducer, {
    selected: initialSelected,
    options,
    filteredOptions: [],
    inputValue: '',
    listHighlightedIndex: -1,
    isInputFocused: false,
    disabled,
    onChange,
  })

  React.useEffect(() => {
    if (reducer[0].options !== options) {
      reducer[1]({ type: ActionType.optionsChanged, options })
    }
    if (reducer[0].disabled !== disabled) {
      reducer[1]({ type: ActionType.disabledChanged, disabled })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, disabled])

  return reducer
}
