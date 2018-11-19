import React, { Component } from 'react'
import moment from 'moment'

const cn = require('bem-cn')('tabs')

if (process.env.BROWSER) {
  require('./tabs.css')
}
moment.locale('ru')

export default class Tabs extends Component {
  state = {
    currentTab: this.props.current,
    tabs: this.props.tabs,
  }

  render() {
    const { currentTab, tabs } = this.state
    const { showCount, style } = this.props

    return (
      <div style={style}>
        <div className={cn}>
          <ul className={cn('list')}>
            {tabs.map((it, i) => (
              <li
                key={i + it.id}
                className={cn('item').state({ current: currentTab === it.id })}
                onClick={() => this.setState({ currentTab: it.id })}
              >
                {it.name}
                {showCount && <sup className={cn('count')}>{it.count}</sup>}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('content')}>
          {tabs.map((it, i) => currentTab === it.id && <div key={i + it.id}>{it.content}</div>)}
        </div>
      </div>
    )
  }
}
