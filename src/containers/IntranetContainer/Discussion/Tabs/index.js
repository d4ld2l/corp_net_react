import React, { Component } from 'react'
import isUndefined from 'lodash/isUndefined'

const cn = require('bem-cn')('discussion-tabs')

if (process.env.BROWSER) {
  require('./style.css')
}

export default class Tabs extends Component {
  changeTab(id, disabled) {
    const { changeTab, loading } = this.props
    if (!disabled && !loading) changeTab({ id })
  }

  render() {
    const {
      tabs: { items, current },
      changeTab,
    } = this.props
    const { show } = this.props
    return (
      <div>
        <div className={cn}>
          <ul className={cn('list')}>
            {items.map(({ id, name, count, title, disabled }) => (
              <li
                key={id}
                className={cn('item').state({
                  current: current === id,
                  disabled,
                })}
                title={disabled || title}
                onClick={this.changeTab.bind(this, id, disabled)}
              >
                {name}
                {!isUndefined(count) && <sup className={cn('count')}>{count}</sup>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
