import { Card, CardBody, CardFooter, CardHeader } from './Card'

export default {
  title: 'common/Card',
}

export const _Card = () => (
  <Card>
    <CardBody>body</CardBody>
  </Card>
)

_Card.story = {
  name: 'card',
}

export const CardWithHeader = () => (
  <Card>
    <CardHeader>header</CardHeader>
    <CardBody>body</CardBody>
  </Card>
)

CardWithHeader.story = {
  name: 'card with header',
}

export const CardWithFooter = () => (
  <Card>
    <CardBody>body</CardBody>
    <CardFooter>footer</CardFooter>
  </Card>
)

CardWithFooter.story = {
  name: 'card with footer',
}

export const CardWithHeaderAndFooter = () => (
  <Card>
    <CardHeader>header</CardHeader>
    <CardBody>body</CardBody>
    <CardFooter>footer</CardFooter>
  </Card>
)

CardWithHeaderAndFooter.story = {
  name: 'card with header and footer',
}

export const CardWithCustomPadding = () => (
  <Card>
    <CardHeader className="px-4 py-2">header</CardHeader>
    <CardBody className="px-4 py-2">body</CardBody>
    <CardFooter className="px-4 py-2">footer</CardFooter>
  </Card>
)

CardWithCustomPadding.story = {
  name: 'card with custom padding',
}
