import { action } from '@storybook/addon-actions'

import { DelayedData } from '../../utils'
import { StorybookForm } from '../StorybookForm.test.support'
import { VirtualizedSelectElement } from './components/VirtualizedSelectElement'
import { VirtualizedSelect } from './VirtualizedSelect'
import {
  IndicatorViewModel,
  indicatorsSyncModel,
} from 'VirtualizedList/VirtualizedList.data.support.test'

const data = [...indicatorsSyncModel]
const smallData = indicatorsSyncModel.slice(0, 30)

const itemToString = (item: IndicatorViewModel | null) => {
  return item ? item.name : ''
}

export default {
  title: 'common/Form/VirtualizedSelect',
}

export const WithInitialEmptyStateAndThenUpdatedWithDataM = () => (
  <DelayedData
    data={data}
    timeout={1000}
    render={(items) => (
      <VirtualizedSelectElement<IndicatorViewModel>
        itemToString={itemToString}
        items={[...items]}
        keyName="indicatorId"
        placeholder="select something..."
        onChange={action('onChange')}
      />
    )}
  />
)

WithInitialEmptyStateAndThenUpdatedWithDataM.story = {
  name: 'with initial empty state and then updated with data (m)',
}

export const SelectM = () => (
  <VirtualizedSelectElement<IndicatorViewModel>
    itemToString={itemToString}
    items={data}
    keyName="indicatorId"
    placeholder="select something..."
    onChange={action('onChange')}
  />
)

SelectM.story = {
  name: 'select (m)',
}

export const SelectNotClearableM = () => (
  <VirtualizedSelectElement<IndicatorViewModel>
    itemToString={itemToString}
    items={smallData}
    keyName="indicatorId"
    placeholder="select something..."
    onChange={action('onChange')}
    selectedItem={2195}
    notClearable
  />
)

SelectNotClearableM.story = {
  name: 'select not clearable (m)',
}

export const SelectWithDefaultValueM = () => (
  <VirtualizedSelectElement<IndicatorViewModel>
    itemToString={itemToString}
    items={smallData}
    keyName="indicatorId"
    placeholder="select something..."
    onChange={action('onChange')}
    selectedItem={2195}
  />
)

SelectWithDefaultValueM.story = {
  name: 'select with default value (m)',
}

export const DefaultM = () => (
  <div style={{ width: 200 }}>
    <StorybookForm>
      <VirtualizedSelect<IndicatorViewModel>
        name="some"
        label="Active"
        options={indicatorsSyncModel}
        keyName="indicatorId"
        itemToString={itemToString}
      />
    </StorybookForm>
  </div>
)

DefaultM.story = {
  name: 'default (m)',
}

export const RequiredM = () => (
  <StorybookForm>
    <VirtualizedSelect<IndicatorViewModel>
      name="some"
      label="Active"
      required
      options={smallData}
      keyName="indicatorId"
      itemToString={itemToString}
    />
  </StorybookForm>
)

RequiredM.story = {
  name: 'required (m)',
}

export const DisabledM = () => (
  <StorybookForm>
    <VirtualizedSelect<IndicatorViewModel>
      name="some"
      label="Active"
      disabled
      options={smallData}
      keyName="indicatorId"
      itemToString={itemToString}
    />
  </StorybookForm>
)

DisabledM.story = {
  name: 'disabled (m)',
}

export const SelectedM = () => (
  <StorybookForm initialValues={{ some: 2195 }}>
    <VirtualizedSelect<IndicatorViewModel>
      name="some"
      label="Active"
      options={indicatorsSyncModel}
      keyName="indicatorId"
      itemToString={itemToString}
    />
  </StorybookForm>
)

SelectedM.story = {
  name: 'selected (m)',
}

export const PlaceholderM = () => (
  <StorybookForm>
    <VirtualizedSelect<IndicatorViewModel>
      name="some"
      label="Active"
      options={smallData}
      keyName="indicatorId"
      itemToString={itemToString}
      placeholder="select something..."
    />
  </StorybookForm>
)

PlaceholderM.story = {
  name: 'placeholder (m)',
}

export const ErrorM = () => (
  <StorybookForm error>
    <VirtualizedSelect<IndicatorViewModel>
      name="some"
      label="Active"
      required
      options={smallData}
      keyName="indicatorId"
      itemToString={itemToString}
    />
  </StorybookForm>
)

ErrorM.story = {
  name: 'error (m)',
}
