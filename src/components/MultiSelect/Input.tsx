import { Action, ActionType } from './reducer'

type Props = Readonly<{
  value: string
  dispatch: React.Dispatch<Action>
}>

export const Input = React.forwardRef<HTMLInputElement, Props>(({ value, dispatch }, ref) => {
  const [inputContainerWidth, setInputContainerWidth] = React.useState(16)
  const containerRef = React.createRef<HTMLDivElement>()

  let measureDivRef: HTMLDivElement | undefined = undefined

  // Init measure text container
  React.useEffect(() => {
    if (containerRef.current) {
      const measureDiv = document.createElement('div')
      containerRef.current.appendChild(measureDiv)
      measureDiv.style.position = 'absolute'
      measureDiv.style.visibility = 'hidden'
      measureDiv.style.height = 'auto'
      measureDiv.style.width = 'auto'
      measureDiv.style.whiteSpace = 'nowrap'

      // eslint-disable-next-line react-hooks/exhaustive-deps
      measureDivRef = measureDiv
    }
  }, [containerRef])

  React.useEffect(() => {
    const calcTextWidth = (text: string): number => {
      const minWidth = 12
      if (measureDivRef) {
        measureDivRef.innerText = text
        return measureDivRef.clientWidth + minWidth
      }

      return minWidth
    }

    setInputContainerWidth(calcTextWidth(value))
  }, [value, measureDivRef])

  const handleOnChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value
    dispatch({ type: ActionType.inputValueChanged, value })
  }

  const handleOnKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.keyCode === 13 && ev.shiftKey === false) {
      ev.preventDefault()
      dispatch({ type: ActionType.highlightedValueSelected })
    }

    if (ev.keyCode === 38 && ev.shiftKey === false) {
      ev.preventDefault()
      dispatch({ type: ActionType.prevListItemSelected })
    }

    if (ev.keyCode === 40 && ev.shiftKey === false) {
      ev.preventDefault()
      dispatch({ type: ActionType.nextListItemSelected })
    }
  }

  return (
    <div ref={containerRef} className="ml-1 mt-1" style={{ width: inputContainerWidth }}>
      <input
        ref={ref}
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        className="border-0 w-full"
        style={{ outline: 'none' }}
      />
    </div>
  )
})
