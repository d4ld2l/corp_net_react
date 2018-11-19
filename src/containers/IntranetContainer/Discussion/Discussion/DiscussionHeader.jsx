import React, { Component } from 'react'

import { cn } from './index'

export default class DiscussionHeader extends Component {
  render() {
    const { tableHeaders, activeEntity } = this.props

    return (
      <div
        className={cn('heading')
          .mix('p3 p3_theme_light')
          .mix(activeEntity && 'discussion__heading_active')}
      >
        {tableHeaders.map(({ id, name }) => (
          <div key={id} className={cn('heading-item')}>
            {name}
          </div>
        ))}
      </div>
    )
  }
}
