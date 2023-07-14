import React from 'react'
import { mdiOmega } from '@mdi/js'
import { ToolbarButton } from './ToolbarButton'
import { Popover } from '../'
import { Symbols } from './Symbols'

type Props = Readonly<{
  disableRichText?: boolean
  onSymbolSelect: (symbol: string) => void
}>

export function SymbolsButton({ disableRichText, onSymbolSelect }: Props) {
  return (
    <Popover
      className="inline"
      trigger={(show) => <ToolbarButton onClick={show} icon={mdiOmega} />}
      body={(hide) => (
        <Symbols
          disableRichText={disableRichText}
          onSymbolSelect={(x) => {
            onSymbolSelect(x)
            hide()
          }}
        />
      )}
    />
  )
}
