import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Like, Trash, Pencil } from 'components-folder/Icon'
import moment from 'moment/moment'
import { deleteComment, dislikeComment, likeComment } from '../../../redux/actions/newsActions'

const cn = require('bem-cn')('intranet-news')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect()

class CommentInner extends Component {
  render() {
    const { post, dispatch, child, updateComment } = this.props
    const avatarUserComment = {
      background: 'url(http://placehold.it/30/7d82cd/ffffff) center center/ cover no-repeat #eee',
    }
    return (
      <section className={cn('comment-wrapper').mix('intranet-news-comments__comment-wrapper_inner')}>
        <div className={cn('data')}>
          {child.account ? (
            <img
              className={cn('avatar')}
              src={child.account.photo.url}
              alt={child.account.full_name}
            />
          ) : (
            <div className={cn('avatar')} style={avatarUserComment} />
          )}
          <section className={cn('wrapper-name-date')}>
            <Link
              to={`/employees/${child.account_id}`}
              className={cn('data-name')}
              title="Перейти на страницу сотрудника"
            >
              {child.account && child.account.full_name}
            </Link>
            <time className={cn('data-date-time')} dateTime="2017-12-18">
              {moment(child.created_at).format('DD.MM.YYYY, HH:mm')}
            </time>
          </section>
          <section className={cn('inner-control-panel')}>
            {!child.deleted_by_id &&
              child.can_edit && (
                <span title="Редактировать" onClick={() => updateComment(child)}>
                  <Pencil className={cn('pencil-icon')} />
                </span>
              )}
            {!child.deleted_by_id &&
              child.can_delete && (
                <span title="Удалить" onClick={() => dispatch(deleteComment(post.id, child.id))}>
                  <Trash className={cn('trash-icon')} />
                </span>
              )}
          </section>
        </div>
        <section className={cn('text-comment-wrapper')}>
          <p
            className={cn('text').mix('intranet-news-comments__text-comment')}
            dangerouslySetInnerHTML={{ __html: child.body }}
          />
        </section>
        <div className={cn('control-panel-comment')}>
          <div className={cn('wrapper-icon')} title="Мне нравится">
            {child.already_liked ? (
              <span
                onClick={() => {
                  if (!child.deleted_by_id) dispatch(dislikeComment(post.id, child.id))
                }}
              >
                <Like className={cn('like-filled-icon')} />
              </span>
            ) : (
              <span
                onClick={() => {
                  if (!child.deleted_by_id) dispatch(likeComment(post.id, child.id))
                }}
              >
                <Like status={'outline'} className={cn('like-icon')} />
              </span>
            )}
            <span className={cn('count')}>{child.likes_count}</span>
          </div>
        </div>
      </section>
    )
  }
}

export default connector(CommentInner)
