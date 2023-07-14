import cn from 'classnames'
import { Action, ActionType } from './reducer'

type Props = Readonly<{
  isFocused: boolean
  invalid?: boolean
  disabled?: boolean
  children: React.ReactNode
  dispatch: React.Dispatch<Action>
}>

export function Container({ isFocused, children, invalid, disabled, dispatch }: Props) {
  const targetRef = React.createRef<HTMLDivElement>()

  const handleOnClick = React.useCallback(() => {
    dispatch({ type: ActionType.inputFocused })
  }, [dispatch])

  const handleClickOutside = (e: Event) => {
    if (e.target instanceof Element) {
      if (targetRef.current && targetRef.current.contains(e.target)) {
        return
      }
    }

    dispatch({ type: ActionType.inputBlurred })
  }

  React.useEffect(() => {
    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, targetRef])

  return (
    <div
      ref={targetRef}
      onClick={handleOnClick}
      className={cn('flex flex-wrap pr-1 pb-1 relative rounded-md border', {
        'border-gray-300': !invalid,
        'border-red-300 invalid': invalid,
        'text-gray-900 bg-gray-100': disabled,
        'lw-div-input': isFocused,
      })}
      style={{
        cursor: 'text',
        minWidth: 100,
      }}
    >
      {children}
    </div>
  )
}
