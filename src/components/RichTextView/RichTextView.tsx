import { Mark, ParagraphNode, RichText, TextNode } from '../../types'

const renderLeaf = (node: TextNode, idx: number): JSX.Element => {
  const El = node[Mark.Superscript] ? 'sup' : node[Mark.Subscript] ? 'sub' : 'span'
  return (
    <El
      key={idx}
      style={{
        fontWeight: node[Mark.Bold] ? 'bold' : 'normal',
        fontStyle: node[Mark.Italic] ? 'italic' : 'normal',
        textDecoration: `${node[Mark.Underline] ? 'underline' : ''} ${
          node[Mark.StrikeThrough] ? 'line-through' : ''
        }`,
      }}
    >
      {node.text}
    </El>
  )
}

const renderParagraph = ({ children }: ParagraphNode, idx: number) => (
  <p className="m-0" key={idx}>
    {children.map(renderLeaf)}
  </p>
)

type Props = Readonly<{
  className?: string
  data: RichText
}>

export function RichTextView({ className, data }: Props) {
  return <div className={className}>{data.map(renderParagraph)}</div>
}
