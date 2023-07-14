import { PathReporter } from 'io-ts/lib/PathReporter'
import { fold, isLeft } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { reduceToString, RichTextFromJsonString } from './rich-text'
import { richTextData } from './rich-text.support.test'

describe('RichText', () => {
  it('should decode', () => {
    const result = RichTextFromJsonString.decode(JSON.stringify(richTextData))
    pipe(
      result,
      fold(
        () => {
          console.error(PathReporter.report(result))
          throw new Error('something is wrong with the test')
        },
        (x) => expect(x).toEqual(richTextData),
      ),
    )
  })

  it('should fail to decode', () => {
    const result = RichTextFromJsonString.decode(
      JSON.stringify([
        ...richTextData,
        {
          ...richTextData[0],
          type: 'unknown',
        },
      ]),
    )
    expect(isLeft(result)).toBeTruthy()
  })

  it('reduceToString', () =>
    expect(reduceToString(richTextData)).toEqual(
      'A line of text in a paragraph.Bold with italics and underlined.Italic and underlined italics only.subscript1+3 superscript1+7bold superscript123456789 ⇒ strike through me underline meIf underlined and strike through, then only strike through should be rendered. However if it is just underlined, then all should be fine.',
    ))
})
