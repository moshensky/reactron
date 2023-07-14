import { indicatorsSyncModel } from './VirtualizedList.data.support.test'
import React from 'react'
import { VirtualizedList } from './VirtualizedList'
import { ListChildComponentProps } from 'react-window'

const data = indicatorsSyncModel

const itemToString = (index: number) => {
  const item = data[index]
  return item ? item.name : ''
}

const render: (itemInfo: ListChildComponentProps) => React.ReactElement = ({ index, style }) => (
  <div style={style} key={`${data[index].indicatorId}`}>
    {itemToString(index)}
  </div>
)

export default {
  title: 'common/VirtualizedList',
}

export const Default = () => (
  <VirtualizedList itemToString={itemToString} renderItem={render} itemCount={data.length} />
)

Default.story = {
  name: 'default',
}

export const Height = () => (
  <VirtualizedList
    itemToString={itemToString}
    height={500}
    renderItem={render}
    itemCount={data.length}
  />
)

Height.story = {
  name: 'height',
}

export const CustomStyleAndRender = () => (
  <VirtualizedList
    itemCount={data.length}
    itemToString={itemToString}
    applyMeasureDivStyle={() => ({
      paddingBottom: '8px',
      fontSize: '24px',
    })}
    renderItem={({ index, style }) => (
      <div style={{ ...style, fontSize: 24 }} key={`${indicatorsSyncModel[index].indicatorId}`}>
        {itemToString(index)}
      </div>
    )}
  />
)

CustomStyleAndRender.story = {
  name: 'custom style and render',
}
