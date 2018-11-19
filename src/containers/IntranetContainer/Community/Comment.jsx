import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Like } from 'components-folder/Icon'
import moment from 'moment/moment'
import { dislikeComment, likeComment, deleteComment } from '../../../redux/actions/feedsActions'
import CommentInner from './CommentInner'

const cn = require('bem-cn')('publication')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect()

class Comment extends Component {
  render() {
    const { post, dispatch, comment, answerComment, updateComment } = this.props
    const avatarUserComment = {
      background: 'url(http://placehold.it/30/7d82cd/ffffff) center center/ cover no-repeat #eee',
    }
    return (
      <section className={cn('comment-wrapper')}>
        <div className={cn('data')}>
          {comment.account ? (
            <img
              className={cn('avatar')}
              src={comment.account.photo.thumb.url}
              alt={comment.account.full_name}
            />
          ) : (
            <div className={cn('avatar')} style={avatarUserComment} />
          )}
          <section className={cn('wrapper-name-date')}>
            <Link
              to={`/employees/${comment.account_id}`}
              className={cn('data-name').mix('link link_theme_light_third')}
              title="Перейти на страницу сотрудника"
            >
              {comment.account && comment.account.full_name}
            </Link>
            <time className={cn('data-date-time').mix('p4 p4_theme_light_second')} dateTime="2017-12-18">
              {moment(comment.created_at).format('DD.MM.YYYY, HH:mm')}
            </time>
          </section>
        </div>
        <section className={cn('text-comment-wrapper')}>
          <p
            className={cn('text').mix('publication__text-comment').mix('p1 p1_theme_light_first')}
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        </section>
        <div className={cn('control-panel-comment')}>
          <div className={cn('wrapper-icon')} title="Мне нравится">
            {comment.already_liked ? (
              <span
                onClick={() => {
                  if (!comment.deleted_by_id) dispatch(dislikeComment(post.id, comment.id))
                }}
              >
                <Like className={cn('like-filled-icon')} />
              </span>
            ) : (
              <span
                onClick={() => {
                  if (!comment.deleted_by_id) dispatch(likeComment(post.id, comment.id))
                }}
              >
                <Like status={'outline'} className={cn('like-icon')} />
              </span>
            )}
            <span className={cn('count').mix('p4 p4_theme_light_second')}>{comment.likes_count}</span>
            {!comment.deleted_by_id &&
              comment.can_edit && (
                <span
                  className={cn('control-panel-comment-element').mix('p2 link_pseudo link_theme_light_third')}
                  onClick={() => updateComment(comment)}
                >
                  Редактировать
                </span>
              )}
            {!comment.deleted_by_id &&
              comment.can_delete && (
                <span
                  className={cn('control-panel-comment-element').mix('p2 link_pseudo link_theme_light_third')}
                  onClick={() => dispatch(deleteComment(post.id, comment.id))}
                >
                  Удалить
                </span>
              )}
            {!comment.deleted_by_id && (
              <span
                className={cn('control-panel-comment-element').mix('p2 link_pseudo link_theme_light_third')}
                onClick={() => answerComment(comment)}
              >
                Ответить
              </span>
            )}
          </div>
        </div>
        {comment.children.map(child => (
          <CommentInner child={child} post={post} key={child.id} updateComment={updateComment} />
        ))}
      </section>
    )
  }
}

export default connector(Comment)
