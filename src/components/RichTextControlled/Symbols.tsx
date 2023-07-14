import { symbols, utf8SubscriptNumbers, utf8SuperscriptNumbers } from '../types/rich-text/symbols'

type Props = Readonly<{
  disableRichText?: boolean
  onSymbolSelect: (symbol: string) => void
}>

export const Symbols = ({ disableRichText, onSymbolSelect }: Props) => {
  const symbols1 = disableRichText
    ? [
        ...utf8SuperscriptNumbers.map((x) => 'x' + x),
        ...utf8SubscriptNumbers.map((x) => 'x' + x),
        ...symbols,
      ]
    : symbols

  const symbolsPerLine = 15
  const rowCount = Math.ceil(symbols1.length / symbolsPerLine)
  const xxx = [...Array(rowCount).keys()]
    .map((x) => ({
      start: x * symbolsPerLine,
      end: x * symbolsPerLine + symbolsPerLine,
    }))
    .map(({ start, end }) => symbols1.slice(start, end))

  return (
    <div className="flex">
      <table>
        <tbody>
          {xxx.map((row, idx) => (
            <tr key={idx}>
              {row.map((x) => {
                return (
                  <td key={x} className="border-0">
                    <button
                      type="button"
                      className="bg-gray-100 w-full lw-zoom50 px-2 py-1 hover:bg-gray-300 rounded"
                      onMouseDown={(ev) => {
                        ev.preventDefault()
                        onSymbolSelect(x[0] === 'x' ? x[1] : x)
                      }}
                    >
                      {x}
                    </button>
                  </td>
                )
              })}
              {row.length < symbolsPerLine && <td colSpan={symbolsPerLine - row.length}>&nbsp;</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
