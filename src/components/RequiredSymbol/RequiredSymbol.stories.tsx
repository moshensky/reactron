import { RequiredSymbol } from './RequiredSymbol'

export default {
  title: 'common/RequiredSymbol',
}

export const Symbol = () => <RequiredSymbol />

Symbol.story = {
  name: 'symbol',
}

export const SymbolWithTextM = () => (
  <>
    text
    <RequiredSymbol />
  </>
)

SymbolWithTextM.story = {
  name: 'symbol with text (m)',
}
