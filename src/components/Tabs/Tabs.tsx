import classNames from 'classnames'
import React, { useState } from 'react'

export type Tabs = ReadonlyArray<{
  header: React.ReactNode
  disabled?: boolean
  content: React.ReactNode
}>

type Props = {
  className?: string
  tabs: Tabs
  commonContent?: React.ReactNode
  defaultSelectedTab?: number
  onTabChange?: (selectedTab: number) => void
}

export function Tabs({
  className,
  tabs,
  commonContent,
  defaultSelectedTab,
  onTabChange,
}: Props): JSX.Element {
  const initialTab = defaultSelectedTab && tabs[defaultSelectedTab] ? defaultSelectedTab : 0
  const [selectedTab, setSelectedTab] = useState(initialTab)

  const handleOnTabSelect = (ev: React.MouseEvent<HTMLElement>, tab: number) => {
    ev.preventDefault()
    if (tabs[selectedTab].disabled !== true) {
      setSelectedTab(tab)
      if (onTabChange) {
        onTabChange(tab)
      }
    }
  }

  return (
    <div className={className}>
      <ul className="flex flex-wrap pl-2 border-b border-gray-300 nav-tabs">
        {tabs.map((tab, idx) => (
          <li className="nav-item -mb-px" key={idx}>
            <a
              className={classNames('nav-link', {
                active: selectedTab === idx,
                disabled: tab.disabled,
              })}
              onClick={(ev) => handleOnTabSelect(ev, idx)}
              href="#"
            >
              {tab.header}
            </a>
          </li>
        ))}
      </ul>
      {commonContent && <div>{commonContent}</div>}
      <div>{tabs[selectedTab].content}</div>
    </div>
  )
}
