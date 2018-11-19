import React, { Component } from 'react'
import { v4 } from 'uuid'

import { NOTIFICATIONS_FILTER, GROUP_DATA } from './data'


const cn = require('bem-cn')('notifications')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications_tab: NOTIFICATIONS_FILTER,
      currentTab: NOTIFICATIONS_FILTER[0].nameTab,
    }
  }

  render() {
    const { currentTab, notifications_tab, } = this.state
    return (
      <div>
      <ul className={cn('filter-list')}>
        {notifications_tab.map(it => (
          <li
            key={v4()}
            className={cn('filter-list-item')
              .mix('cur')
              .state({ current: currentTab === `${it.nameTab}` })}
            onClick={() => this.setState({ currentTab: `${it.nameTab}` })}
          >
            <p className={cn('filter-list-item-text')}>{it.title}</p>
          </li>
        ))}
      </ul>
        {/*<div>*/}
          {/*{currentTab === 'all' &&*/}
            {/*GROUP_DATA.map(it => (*/}
              {/*<Filter*/}
                {/*key={v4()}*/}
                {/*read={it.read}*/}
                {/*logo={it.logo}*/}
                {/*title={it.title}*/}
                {/*subtitle={it.subtitle}*/}
                {/*date={it.date}*/}
                {/*time={it.time}*/}
                {/*director={it.director}*/}
              {/*/>*/}
            {/*))}*/}
          {/*{currentTab === 'recruitment' &&*/}
          {/*GROUP_DATA.map(it => (*/}
              {/*<Project*/}
                {/*key={v4()}*/}
              {/*/>*/}
            {/*))}*/}
          {/*{currentTab === 'projects' &&*/}
          {/*GROUP_DATA.map(it => (*/}
            {/*<Project*/}
              {/*key={v4()}*/}
            {/*/>*/}
          {/*))}*/}
          {/*{currentTab === 'interviews' &&*/}
          {/*GROUP_DATA.map(it => (*/}
            {/*<Project*/}
              {/*key={v4()}*/}
            {/*/>*/}
          {/*))}*/}
        {/*</div>*/}
        </div>

    )
  }
}
