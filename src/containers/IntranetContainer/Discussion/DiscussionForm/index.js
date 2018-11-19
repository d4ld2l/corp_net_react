import React, { Component } from 'react'

import { Close } from 'components-folder/Icon'
import Form from './Form'

export const cn = require('bem-cn')('discussion-form')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class DiscussionEdit extends Component {
  render() {
    // Data
    const { activeDiscussion } = this.props

    // Actions
    const { closeAll } = this.props

    return (
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          {activeDiscussion.id ? <h2>Редактирование</h2> : <h2>Новое обсуждение</h2>}
          <span
            onClick={closeAll}
            className={cn('closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть'}
          >
            <Close className={cn('closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('form').mix('global-scroll global-scroll_theme_light')}>
          <Form />
        </div>
      </div>
    )
  }
}
