import React, { useMemo, useState } from 'react'
import { mdiDatabaseSearchOutline } from '@mdi/js'
import { ToolbarButton } from './ToolbarButton'
import { Popover } from '../Popover'
import { reduceToString, RichText } from '../types'
import { RichTextView } from '../RichTextView'
import { matchSorter } from 'match-sorter'
import './suggestions-button.css'
import { Input } from '../Input'

type Props = Readonly<{
  suggestions: RichText[]
  defaultShow?: boolean
  onSelect: (data: RichText) => void
}>

export function SuggestionsButton({ suggestions, defaultShow, onSelect }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const allSuggestions = useMemo(
    () =>
      suggestions.map((x) => ({
        suggestion: x,
        text: reduceToString(x),
      })),
    [suggestions],
  )
  const filteredSuggestions = searchValue
    ? matchSorter(allSuggestions, searchValue, { keys: ['text'] })
    : allSuggestions
  return (
    <Popover
      defaultShow={defaultShow}
      className="inline"
      trigger={(show) => <ToolbarButton onClick={show} icon={mdiDatabaseSearchOutline} />}
      body={(hide) => {
        return (
          <div className="lw-suggestions-root">
            <div className="lw-suggestions-input">
              <Input
                autoFocus
                value={searchValue}
                onChange={(ev) => setSearchValue(ev.target.value)}
              />
            </div>
            <div className="lw-suggestions-container">
              {filteredSuggestions.map((x, idx) => (
                <div
                  key={idx}
                  onMouseDown={(ev) => {
                    ev.preventDefault()
                    onSelect(x.suggestion)
                    hide()
                  }}
                >
                  <RichTextView data={x.suggestion} />
                </div>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}
