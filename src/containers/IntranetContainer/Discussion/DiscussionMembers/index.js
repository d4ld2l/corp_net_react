import React, { Component } from 'react'
import { compact } from 'lodash'
import DiscussionMember from './DiscussionMember'
import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon'

export const cn = require('bem-cn')('discussion-members')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class DiscussionMembers extends Component {
  render() {
    const { activeDiscussion, accounts, showCard, closeAll } = this.props
    const { author, discussers } = activeDiscussion
    return (
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          <div className={cn('arrow-icon-wrapper')} onClick={showCard.bind(this, activeDiscussion)}>
            <Arrow className={cn('arrow-icon')} />
          </div>
          <span
            onClick={closeAll}
            className={cn('closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('body').mix('global-scroll global-scroll_theme_light')}>
          {compact(
            discussers.map(({ account_id }) => accounts.find(({ id }) => id === account_id))
          ).map(it => (
            <DiscussionMember key={it.id} member={it} />
          ))}
        </div>
      </div>
    )
  }
}
