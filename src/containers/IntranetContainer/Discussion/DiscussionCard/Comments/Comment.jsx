import React, { Component } from 'react'
import moment from 'moment-timezone'
import { Pencil, Trash, Like, Plane } from 'components-folder/Icon'

import { cn } from './index'

export default class Comment extends Component {
  render() {
    const { activeDiscussion, comment, user } = this.props
    const { likeComment, dislikeComment, editComment, deleteComment } = this.props

    return (
      <div
        className={cn('item').mix(!comment.read && cn('item_unread'))}
        ref={node => (this.container = node)}
      >
        <div
          className={cn('avatar')}
          style={{
            background: `url('${comment.account.photo.url}') center center / cover no-repeat`,
            opacity: comment.tmp ? 0.5 : 1,
          }}
        />
        <div className={cn('body')}>
          <div className={cn('header')}>
            <div className={cn('name').mix('p1 p1_theme_light_first fw_500')}>
              {comment.account.full_name}
              <time className={cn('date-time').mix('p3 p3_theme_light fw_400')}>
                {moment(comment.created_at)
                  .tz(moment.tz.guess() || 'Europe/Moscow')
                  .format('DD.MM.YYYY, HH:mm')}
              </time>
            </div>
            {!comment.deleted_at && (
              <div className={cn('func-elem')}>
                {comment.already_liked ? (
                  <span onClick={dislikeComment.bind(this, comment.id)}>
                    <Like className={cn('like-icon')} />
                    {comment.likes_count > 0 && (
                      <span className={cn('like-count')}>{comment.likes_count}</span>
                    )}
                  </span>
                ) : (
                  <span onClick={likeComment.bind(this, comment.id)}>
                    <Like status={'outline'} className={cn('like-icon')} />
                    {comment.likes_count > 0 && (
                      <span className={cn('like-count')}>{comment.likes_count}</span>
                    )}
                  </span>
                )}
                {activeDiscussion.state === 'opened' &&
                  comment.account_id === user.id &&
                  comment.can_edit && (
                    <span
                      onClick={editComment.bind(this, comment.id)}
                      className={cn('func-elem-wrap')}
                    >
                      <Pencil className={cn('func-elem-icon')} />
                    </span>
                  )}
                {activeDiscussion.state === 'opened' &&
                  comment.account_id === user.id &&
                  comment.can_delete && (
                    <span
                      onClick={deleteComment.bind(this, comment.id)}
                      className={cn('func-elem-wrap')}
                    >
                      <Trash className={cn('func-elem-icon')} />
                    </span>
                  )}
              </div>
            )}
          </div>
          <div className={cn('text')}>
            {comment.deleted_at ? (
              <p
                className={'p1 p1_theme_light_first'}
                dangerouslySetInnerHTML={{ __html: comment.body }}
              />
            ) : (
              <p className={'p1 p1_theme_light_first'}>{comment.body}</p>
            )}
          </div>
          {comment.photos.length > 0 &&
            comment.photos.map(photo => (
              <p key={photo.id}>
                <img src={photo.file.url} alt="" className={cn('photo')} />
              </p>
            ))}
          {comment.documents.length > 0 && (
            <div className={cn('documents')}>
              {comment.documents.map(it => (
                <div key={it.id}>
                  <a
                    target="_blank"
                    className="link link_theme_light_third link_pseudo"
                    href={it.file.url}
                  >
                    {it.name.replace(/\.[^/.]+$/, '')}
                  </a>
                  <span className="p2 p2_theme_light_second fw_400">{it.extension}</span>
                </div>
              ))}
            </div>
          )}
          {/*<span>
            <a className={cn('link')}>Ответить</a>
          </span>*/}
        </div>
      </div>
    )
  }
}
