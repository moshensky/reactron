import { Tabs } from './Tabs'

const tabs: Tabs = [
  {
    header: 'first',
    content: 'content first',
  },
  {
    header: 'second',
    content: 'content second',
  },
  {
    header: 'third',
    disabled: true,
    content: 'content third',
  },
]

export default {
  title: 'common/Tabs',
}

export const Default = () => <Tabs tabs={tabs} />

Default.story = {
  name: 'default',
}

export const CommonContent = () => <Tabs tabs={tabs} commonContent={'something common'} />

CommonContent.story = {
  name: 'common content',
}

export const DefaultTab = () => <Tabs tabs={tabs} defaultSelectedTab={1} />

DefaultTab.story = {
  name: 'default tab',
}

export const DefaultTabShouldFailAndBe0 = () => <Tabs tabs={tabs} defaultSelectedTab={100} />

DefaultTabShouldFailAndBe0.story = {
  name: 'default tab should fail and be 0',
}
