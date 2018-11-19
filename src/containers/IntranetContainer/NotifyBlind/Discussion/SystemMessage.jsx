import React, { Component } from 'react'
import moment from 'moment-timezone'
import { get } from 'lodash'
import { Pencil, Trash, Like, Plane } from 'components-folder/Icon'

const cn = require('bem-cn')('discussion-comments')

export default class SystemMessage extends Component {
  render() {
    const { activeDiscussion, comment, user } = this.props
    const { likeComment, dislikeComment, editComment, deleteComment } = this.props

    return (
      <div
        className={cn('item')
          .mix(!comment.read && cn('item_unread'))
          .mix('notify-comment-item discussion-comments__item')}
        ref={node => (this.container = node)}
      >
        <div
          className={cn('body')}
          style={{ textAlign: 'center' }}
          title={moment(comment.updated_at)
            .tz(moment.tz.guess() || 'Europe/Moscow')
            .format('DD.MM.YYYY, HH:mm')}
        >
          <div className={cn('text')}>
            <p
              className={'p2 p2_theme_light fw_400'}
              style={{
                color: this.props.color || 'inherit',
              }}
              dangerouslySetInnerHTML={{
                __html: [get(comment, 'account.full_name'), comment.body].join(' '),
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
