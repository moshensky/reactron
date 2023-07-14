import { useSlate } from 'slate-react'
import { Node, Transforms } from 'slate'
import { mkCustomEditor } from './custom-editor'
import {
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiFormatStrikethrough,
  mdiFormatSuperscript,
  mdiFormatSubscript,
} from '@mdi/js'
import { ToolbarButton, ToolbarButtonProps } from './ToolbarButton'
import { SymbolsButton } from './SymbolsButton'
import { SuggestionsButton } from './SuggestionsButton'
import { isRichTextEmpty, RichText } from '../../types'

type Props = Readonly<{
  suggestions?: RichText[]
  disableRichText?: boolean
}>

export const Toolbar = ({ suggestions, disableRichText }: Props) => {
  const editor = useSlate()
  const ce = mkCustomEditor(editor)
  const inlineActions: ReadonlyArray<ToolbarButtonProps> = [
    {
      icon: mdiFormatBold,
      isActive: ce.isBoldMarkActive(),
      onClick: ce.toggleBoldMark,
    },
    {
      icon: mdiFormatItalic,
      isActive: ce.isItalicMarkActive(),
      onClick: ce.toggleItalicMark,
    },
    {
      icon: mdiFormatUnderline,
      isActive: ce.isUnderlineMarkActive(),
      onClick: ce.toggleUnderlineMark,
    },
    {
      icon: mdiFormatStrikethrough,
      isActive: ce.isStrikeThroughMarkActive(),
      onClick: ce.toggleStrikeThroughMark,
    },
    {
      icon: mdiFormatSuperscript,
      isActive: ce.isSuperscriptActive(),
      onClick: ce.toggleSuperscript,
    },
    {
      icon: mdiFormatSubscript,
      isActive: ce.isSubscriptActive(),
      onClick: ce.toggleSubscript,
    },
  ]

  const onSymbolSelect = (x: string): void => {
    editor.insertText(x)
  }

  const onSuggestionSelect = (data: RichText): void => {
    const isEmpty = isRichTextEmpty(editor.children as any)
    if (isEmpty) {
      Transforms.insertNodes(editor, data as unknown as Node[], { at: [0] })
      Transforms.removeNodes(editor, { at: [editor.children.length - 1] })
    } else {
      Transforms.insertNodes(editor, data as unknown as Node[], { at: [editor.children.length] })
    }
  }

  return (
    <div className="flex mb-1">
      {!disableRichText && (
        <>
          <div>
            {inlineActions.map((x) => (
              <ToolbarButton {...x} key={x.icon} />
            ))}
          </div>

          <div className="ml-2">
            <SymbolsButton onSymbolSelect={onSymbolSelect} disableRichText={disableRichText} />
          </div>
        </>
      )}
      {suggestions && (
        <div className="ml-2">
          <SuggestionsButton onSelect={onSuggestionSelect} suggestions={suggestions} />
        </div>
      )}
    </div>
  )
}
