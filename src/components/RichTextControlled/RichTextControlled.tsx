import React, { useCallback, useMemo } from 'react'
import { createEditor, Transforms, BaseEditor, Descendant } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from 'slate-react'
import { mkCustomEditor, toggleMark } from './custom-editor'
import { Toolbar } from './Toolbar'
import isHotkey from 'is-hotkey'
import { Mark, ParagraphNode, RichText as RichTextT, TextNode } from '../../types'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: ParagraphNode
    Text: TextNode
  }
}

const HOTKEYS: Record<string, Mark> = {
  'mod+b': Mark.Bold,
  'mod+i': Mark.Italic,
  'mod+u': Mark.Underline,
  'mod+up': Mark.Superscript,
  'mod+down': Mark.Subscript,
}

const DefaultElement = (props: RenderElementProps) => {
  return (
    <p {...props.attributes} className="m-0">
      {props.children}
    </p>
  )
}

// Define a React component to render leaves with bold text.
const Leaf = ({ leaf, children, attributes }: RenderLeafProps) => {
  const El = leaf[Mark.Superscript] ? 'sup' : leaf[Mark.Subscript] ? 'sub' : 'span'
  return (
    <El
      {...attributes}
      style={{
        fontWeight: leaf[Mark.Bold] ? 'bold' : 'normal',
        fontStyle: leaf[Mark.Italic] ? 'italic' : 'normal',
        textDecoration: `${leaf[Mark.Underline] ? 'underline' : ''} ${
          leaf[Mark.StrikeThrough] ? 'line-through' : ''
        }`,
      }}
    >
      {children}
    </El>
  )
}

function withSingleLine(editor: ReactEditor): ReactEditor {
  const { normalizeNode } = editor

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length > 1) {
        Transforms.mergeNodes(editor)
      }
    }

    return normalizeNode([node, path])
  }

  return editor
}

function withId(editor: ReactEditor): ReactEditor {
  return editor
}

type Props = Readonly<{
  className?: string
  value?: RichTextT
  disabled?: boolean
  disableRichText?: boolean
  singleLine?: boolean
  suggestions?: RichTextT[]
  hideToolbar?: boolean
  stopPropagation?: boolean
  onChange: (x: RichTextT) => void
}>

const emptyValue: RichTextT = [
  {
    type: 'p',
    children: [{ text: '' }],
  },
]
const mkDefault = (value?: RichTextT): Descendant[] => {
  const val = value || emptyValue
  const result = val.length === 0 ? emptyValue : val
  return result as unknown as Descendant[]
}

const editableStyle: React.CSSProperties = {
  wordBreak: 'break-word',
}

export function RichTextControlled({
  value,
  disabled,
  disableRichText,
  singleLine,
  suggestions,
  className,
  hideToolbar,
  stopPropagation,
  onChange,
}: Props) {
  const editor = useMemo(
    () => (singleLine ? withSingleLine : withId)(withReact(createEditor())),
    [singleLine],
  )
  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultElement {...props} />,
    [],
  )
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
  const onHotKey = useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      if (disableRichText || disabled) {
        return
      }
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, ev as any)) {
          ev.preventDefault()
          const mark = HOTKEYS[hotkey]
          switch (mark) {
            case Mark.StrikeThrough: {
              mkCustomEditor(editor).toggleStrikeThroughMark()
              return
            }
            case Mark.Underline: {
              mkCustomEditor(editor).toggleUnderlineMark()
              return
            }
            case Mark.Superscript: {
              mkCustomEditor(editor).toggleSuperscript()
              return
            }
            case Mark.Subscript: {
              mkCustomEditor(editor).toggleSubscript()
              return
            }
            default:
              toggleMark(mark)(editor)
          }
        }
      }
    },
    [editor, disabled, disableRichText],
  )

  const onStopPropagation = useCallback(
    (x: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (stopPropagation) {
        x.stopPropagation()
      }
    },
    [stopPropagation],
  )

  const val = mkDefault(value)

  return (
    <Slate
      editor={editor}
      value={val}
      onChange={(newValue) => {
        onChange(newValue as unknown as RichTextT)
      }}
    >
      {!disabled && !hideToolbar && (
        <Toolbar suggestions={suggestions} disableRichText={disableRichText} />
      )}
      <Editable
        readOnly={disabled}
        disabled={disabled}
        className={className}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        style={editableStyle}
        onKeyDown={onHotKey}
        onClick={onStopPropagation}
      />
    </Slate>
  )
}
