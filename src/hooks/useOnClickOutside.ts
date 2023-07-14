import { RefObject, useEffect } from 'react'

export const useOnClickOutside = (
  enable: boolean,
  elements: RefObject<HTMLElement>[],
  onClickOutside: () => void,
) => {
  const handleClickOutside = (e: Event) => {
    if (e.target instanceof Element) {
      const target = e.target
      if (elements.some((x) => x.current && x.current.contains(target))) {
        return
      }
    }

    onClickOutside()
  }

  useEffect(() => {
    if (enable) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable])
}
