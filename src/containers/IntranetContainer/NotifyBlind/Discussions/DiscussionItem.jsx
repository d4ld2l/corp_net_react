import React, { Component } from 'react'
import moment from 'moment-timezone'
import { get } from 'lodash'

import { Arrow } from 'components-folder/Icon/'

let VisibilitySensor = () => <div />
export const cn = require('bem-cn')('notify-roster-item')
if (process.env.BROWSER) {
  VisibilitySensor = require('react-visibility-sensor').default
}

export default class DiscussionItem extends Component {
  onChange = isVisible => {
    const {
      discussion: { id },
      topics: { discussions, loading, nextDiscussionPage, discussionsTriggerid },
    } = this.props
    const { loadTopics } = this.props
    if (!loading && nextDiscussionPage && id === discussionsTriggerid && isVisible) {
      loadTopics()
    }
  }

  render() {
    const { discussion } = this.props
    const { showCard } = this.props

    return (
      <VisibilitySensor
        onChange={isVisible => this.onChange.call(this, isVisible)}
        resizeCheck={true}
        scrollCheck={true}
      >
        <div className={cn} title={'Нажмите, чтобы открыть'} onClick={() => showCard(discussion)}>
          <div className={cn('data')}>
            {/*<div
              className={cn('photo')}
              style={{
                background: `url('https://picsum.photos/200/300/?random') center center / cover no-repeat`,
              }}
            />*/}
            <div>
              <p className={cn('title')}>
                {discussion.name}
                {discussion.state === 'closed' ? <i> (закрыто)</i> : ''}
              </p>
              <div className={cn('subtitle')}>
                <span className={cn('name')}>{get(discussion, 'author.full_name', '')}, </span>
                <time className={cn('time')} dateTime={'12.12.2017'}>
                  {moment(discussion.created_at)
                    .tz('Europe/Moscow')
                    .format('DD.MM.YYYY, h:mm a')}
                </time>
              </div>
            </div>
          </div>
          <div>
            {discussion.unread_count !== 0 && (
              <span className={cn('count-msg')}>{discussion.unread_count}</span>
            )}
            <span>
              <Arrow className={cn('arrow-light-icon')} />
            </span>
          </div>
        </div>
      </VisibilitySensor>
    )
  }
}
