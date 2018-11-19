import React, { Component } from 'react'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import { Pencil, Close, Like } from 'components-folder/Icon'

const cn = require('bem-cn')('notify-comment-item')

export default class CommentItem extends Component {
  isLikeComment = () => {
    const { dispatch, isLikeComment } = this.props
    dispatch({ type: 'I_LIKE_IT_COMMENT', payload: !isLikeComment })
  }

  render() {
    const {
      user,
      comment,
      topics: { comments, activeDiscussion },
      editComment,
      deleteComment,
      likeComment,
      dislikeComment,
    } = this.props
    //TODO: isInner - ответ на комметарий
    //TODO: isNew - новый комметарий
    //TODO: isEdited - изменяемый комметарий
    //TODO: unEdited - неизменяемые комметарии

    const { isInner, isNew, isEdited, unEdited } = this.props
    return (
      <div
        className={cn
          .mix(isInner && 'notify-comment-item_inner')
          .mix(!comment.read && 'notify-comment-item_new discussion-comments__item_unread')
          .mix(isEdited && 'notify-comment-item_edited')
          .mix(unEdited && 'notify-comment-item_un-edited')
          .mix('discussion-comments__item')}
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
            <div className={cn('data')}>
              <span className={cn('name')}>{comment.account.full_name}</span>
              <time
                dateTime={moment(comment.created_at)
                  .tz(moment.tz.guess() || 'Europe/Moscow')
                  .format('DD.MM.YYYY, HH:mm')}
                className={cn('date-time')}
              >
                {moment(comment.created_at)
                  .tz(moment.tz.guess() || 'Europe/Moscow')
                  .format('DD.MM.YYYY, HH:mm')}
              </time>
            </div>
            {!comment.deleted_at && (
              <div className={cn('func-elem')}>
                {activeDiscussion.state === 'opened' &&
                  comment.account_id === user.id &&
                  comment.can_edit && (
                    <span
                      onClick={editComment.bind(this, comment.id)}
                      className={cn('edit')}
                      title={'Редактировать'}
                    >
                      <Pencil className={cn('edit-icon')} />
                    </span>
                  )}
                {activeDiscussion.state === 'opened' &&
                  comment.account_id === user.id &&
                  comment.can_delete && (
                    <span
                      onClick={deleteComment.bind(this, comment.id)}
                      className={cn('remove')}
                      title={'Удалить'}
                    >
                      <Close className={cn('remove-icon')} />
                    </span>
                  )}
              </div>
            )}
          </div>
          <div className={cn('content')}>
            {comment.deleted_at ? (
              <p className={cn('text')} dangerouslySetInnerHTML={{ __html: comment.body }} />
            ) : (
              <p className={cn('text')}>{comment.body}</p>
            )}
            {comment.photos.length > 0 &&
              comment.photos.map(photo => (
                <div
                  key={photo.id}
                  className={cn('image')}
                  style={{
                    background: `url('${photo.file.url}') center center / cover no-repeat`,
                  }}
                />
              ))}
            {comment.documents.length > 0 && (
              <ul className={cn('list')}>
                {comment.documents.map(it => (
                  <li key={it.id} className={'item'}>
                    <a target="_blank" className={cn('link')} href={it.file.url}>
                      {it.name.replace(/\.[^/.]+$/, '')}
                    </a>
                    <span className="format">{it.extension}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={cn('wrap')}>
            {comment.already_liked ? (
              <span className={cn('i-like-it')} onClick={dislikeComment.bind(this, comment.id)}>
                <Like className={cn('like').mix(cn('like_active'))} />
                {comment.likes_count > 0 && (
                  <span className={cn('like-count')}>{comment.likes_count}</span>
                )}
              </span>
            ) : (
              <span className={cn('i-like-it')} onClick={likeComment.bind(this, comment.id)}>
                <Like status={'outline'} className={cn('like')} />
                {comment.likes_count > 0 && (
                  <span className={cn('like-count')}>{comment.likes_count}</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
}
