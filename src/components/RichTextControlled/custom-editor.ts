import { Mark } from '../types'
import { Editor } from 'slate'

const isMarkActive =
  (mark: Mark) =>
  (editor: Editor): boolean => {
    const marks = Editor.marks(editor)
    return marks ? marks[mark] === true : false
  }

export const toggleMark =
  (mark: Mark) =>
  (editor: Editor): void => {
    const isActive = isMarkActive(mark)(editor)
    if (isActive) {
      Editor.removeMark(editor, mark)
    } else {
      Editor.addMark(editor, mark, true)
    }
  }

const isSuperscriptActive = isMarkActive(Mark.Superscript)
const isSubscriptActive = isMarkActive(Mark.Subscript)
const toggleSuperscript = toggleMark(Mark.Superscript)
const toggleSubscript = toggleMark(Mark.Subscript)

const isUnderlineMarkActive = isMarkActive(Mark.Underline)
const isStrikeThroughMarkActive = isMarkActive(Mark.StrikeThrough)
const toggleUnderlineMark = toggleMark(Mark.Underline)
const toggleStrikeThroughMark = toggleMark(Mark.StrikeThrough)

export const mkCustomEditor = (x: Editor) => ({
  isBoldMarkActive: () => isMarkActive(Mark.Bold)(x),
  isItalicMarkActive: () => isMarkActive(Mark.Italic)(x),
  isUnderlineMarkActive: () => isUnderlineMarkActive(x),
  isStrikeThroughMarkActive: () => isStrikeThroughMarkActive(x),
  isSuperscriptActive: () => isSuperscriptActive(x),
  isSubscriptActive: () => isSubscriptActive(x),

  toggleBoldMark: () => toggleMark(Mark.Bold)(x),
  toggleItalicMark: () => toggleMark(Mark.Italic)(x),

  toggleUnderlineMark: () => {
    if (isStrikeThroughMarkActive(x) && !isUnderlineMarkActive(x)) {
      toggleStrikeThroughMark(x)
    }
    toggleUnderlineMark(x)
  },
  toggleStrikeThroughMark: () => {
    if (isUnderlineMarkActive(x) && !isStrikeThroughMarkActive(x)) {
      toggleUnderlineMark(x)
    }
    toggleStrikeThroughMark(x)
  },

  toggleSuperscript: () => {
    if (isSubscriptActive(x) && !isSuperscriptActive(x)) {
      toggleSubscript(x)
    }
    toggleSuperscript(x)
  },
  toggleSubscript: () => {
    if (isSuperscriptActive(x) && !isSubscriptActive(x)) {
      toggleSuperscript(x)
    }
    toggleSubscript(x)
  },
})
