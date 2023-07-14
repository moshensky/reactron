import React from 'react'
import { ListChildComponentProps, VariableSizeList } from 'react-window'

type Props = {
  itemCount: number
  itemToString: (index: number) => string
  height?: number
  renderItem: (itemInfo: ListChildComponentProps) => React.ReactElement
  applyMeasureDivStyle?: () => Partial<CSSStyleDeclaration>
  scrollToIndex?: number
}

export function VirtualizedList({
  itemCount,
  itemToString,
  height,
  renderItem,
  applyMeasureDivStyle,
  scrollToIndex,
}: Props) {
  const listRef = React.createRef<VariableSizeList>()
  const containerRef = React.createRef<HTMLDivElement>()
  const [measureDiv, setMeasureDiv] = React.useState<HTMLDivElement>()

  React.useEffect(() => {
    if (scrollToIndex !== undefined && listRef.current) {
      listRef.current.scrollToItem(scrollToIndex, 'auto')
    }
  }, [listRef, scrollToIndex])

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [containerRef])

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()

      const measureDiv = document.createElement('div')
      containerRef.current.appendChild(measureDiv)
      if (applyMeasureDivStyle) {
        const styles = applyMeasureDivStyle()
        Object.keys(styles).forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          measureDiv.style[key] = styles[key]
        })
      } else {
        measureDiv.style.paddingBottom = '4px'
      }

      measureDiv.style.width = `${measureDiv.offsetWidth}px`
      measureDiv.style.position = 'fixed'
      measureDiv.style.right = '-10000px'
      measureDiv.style.overflowY = 'scroll'
      setMeasureDiv(measureDiv)
    }
  }, [containerRef, applyMeasureDivStyle])

  const OuterElementType = React.useMemo(
    () =>
      React.forwardRef<HTMLDivElement>((props, ref) => (
        <div {...props} onMouseUp={(ev) => ev.stopPropagation()} ref={ref} />
      )),
    [],
  )

  const measureText = (text: string): number => {
    if (measureDiv) {
      measureDiv.innerText = text

      return measureDiv.offsetHeight
    }

    return 42
  }

  const items = measureDiv ? itemCount : 0

  return (
    <VariableSizeList
      key={items}
      ref={listRef}
      style={{
        overflowX: 'hidden',
        background: '#FFF',
        borderRadius: '0 0 0.25rem 0.25rem',
      }}
      outerRef={containerRef}
      outerElementType={OuterElementType}
      width="100%"
      height={height ? height : items < 5 ? items * 42 : 200}
      itemCount={items}
      itemSize={(index) => measureText(itemToString(index))}
    >
      {renderItem}
    </VariableSizeList>
  )
}
