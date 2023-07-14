import * as t from 'io-ts'

export enum Mark {
  Bold = 'b',
  Italic = 'i',
  Underline = 'u',
  StrikeThrough = 'st',
  Superscript = 'sp',
  Subscript = 'sb',
}

const TextNodeOptionalProps = t.partial({
  [Mark.Bold]: t.boolean,
  [Mark.Italic]: t.boolean,
  [Mark.Underline]: t.boolean,
  [Mark.StrikeThrough]: t.boolean,
  [Mark.Superscript]: t.boolean,
  [Mark.Subscript]: t.boolean,
})
const TextNodeRequiredProps = t.type({
  text: t.string,
})
export const TextNode = t.intersection([TextNodeRequiredProps, TextNodeOptionalProps])
export type TextNode = t.TypeOf<typeof TextNode>

export const ParagraphNode = t.type({
  type: t.literal('p'),
  children: t.readonlyArray(TextNode),
})
export type ParagraphNode = t.TypeOf<typeof ParagraphNode>

export const RichText = t.readonlyArray(ParagraphNode)
export type RichText = t.TypeOf<typeof RichText>

const ParseJson = new t.Type<object, string, string>(
  'ParseJson',
  (x): x is object => {
    throw Error(`'is' for JsonString is not defined. Value: ${x}`)
  },
  (s, c) => {
    try {
      return t.success(JSON.parse(s))
    } catch (error) {
      console.error(error)
      return t.failure(s, c)
    }
  },
  String,
)

export const RichTextFromJsonString = t.string
  .pipe(ParseJson, 'ParseJson')
  .pipe(RichText, 'RichText')

export const mkRichText = (text = ''): RichText => [{ type: 'p', children: [{ text }] }]

export const isRichTextEmpty = (data: RichText): boolean => {
  for (const { children } of data) {
    if (children.some((x) => x.text.length > 0)) {
      return false
    }
  }

  return true
}

type AddTextAsNode = (data: RichText, text: string, opts?: { sp?: boolean }) => RichText

export const appendToLastParagraph: AddTextAsNode = (data, text, opts = {}): RichText => {
  if (data.length === 0) {
    data
  }

  const lastParagraph = data[data.length - 1]
  const data1 = [...data]
  data1[data.length - 1] = {
    ...lastParagraph,
    children: [...lastParagraph.children, { text, ...opts }],
  }

  return data1
}

export const prependToFirstParagraph: AddTextAsNode = (data, text, opts = {}): RichText => {
  if (data.length === 0) {
    data
  }

  const firstParagraph = data[0]
  const data1 = [...data]
  data1[0] = {
    ...firstParagraph,
    children: [{ text, ...opts }, ...firstParagraph.children],
  }

  return data1
}

export const serializeRichText = (data: RichText): string => JSON.stringify(data)
export const serializeNullableRichText = (data: RichText | null): string | null =>
  data ? serializeRichText(data) : data

export const reduceToString = (data: RichText): string =>
  data.reduce((acc, { children }) => acc + children.reduce((acc1, { text }) => acc1 + text, ''), '')
