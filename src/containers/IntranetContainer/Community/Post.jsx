import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import scrollToComponent from 'components-folder/ScrollToComponent';
import ReactDOM from 'react-dom'

import {
  like,
  dislike,
  delInFavorites,
  setInFavorites,
  deletePost,
  sendComment,
  updateComment,
  setSearchValue,
  search,
  setSearchOpen,
} from '../../../redux/actions/feedsActions'
import {
  Star,
  Like,
  Comment,
  Trash,
  Pencil,
  Plane,
} from 'components-folder/Icon'
import Comments from './Comments'
import NewPost from './NewPost'

const cn = require('bem-cn')('publication')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect(state => ({
  user: state.user,
}))

class Post extends Component {
  state = {
    openFullRecord: false,
    parentCommentId: null,
    commentId: null,
    editPost: false,
  }

  formatMentions(str){
    const reactStringReplace = require('react-string-replace')
    return reactStringReplace(str, /(@\[[А-Яа-яA-Za-zЁё ]+\]\(\d+\))/g, (match, i) => {
        const parse = match.match(/@\[([А-Яа-яA-Za-zЁё ]+)\]\((\d+)\)/)
        return(
          <Link to={`/employees/${parse[2]}`} key={parse[1]+i+parse[2]}>{parse[1]}</Link>
        )
      }
    )
  }

  formatTags(str){
    const reactStringReplace = require('react-string-replace')
    return reactStringReplace(str, /(#[А-Яа-яA-Za-z\-\wЁё]+)/g, (match, i) => {
        return(
          <Link to='#' key={match+i} onClick={() => this.handleClickTag(match)}>{match}</Link>
        )
      }
    )
  }

  formatBr(str){
    const reactStringReplace = require('react-string-replace')
    return reactStringReplace(str, /\n/g, (match, i) => {
        return(
          <p>{match}</p>
        )
      }
    )

  }

  formatPost(post){
    let formatedPost = this.formatBr(this.formatTags(this.formatMentions(post)))
    return formatedPost
  }

  handleClickTag(tag){
    const { dispatch } = this.props
    window.scrollTo(0,0)
    dispatch(setSearchValue(tag))
    dispatch(search(encodeURIComponent(tag)))
    dispatch(setSearchOpen(true))
  }

  sendComment() {
    if (this.refs.comment.value) {
      const { post, dispatch } = this.props
      if (this.state.commentId) {
        const comment = {
          body: this.refs.comment.value,
          id: this.state.commentId,
        }
        if (this.state.parentCommentId) {
          comment.parent_comment_id = this.state.parentCommentId
        }
        dispatch(updateComment(post.id, comment)).then(() => {
          this.setState({ parentCommentId: null, commentId: null })
          this.refs.comment.value = ''
        })
      } else {
        dispatch(
          sendComment(post.id, this.refs.comment.value, this.state.parentCommentId)
        ).then(() => {
          this.setState({ parentCommentId: null })
          this.refs.comment.value = ''
        })
      }
    }
  }

  answerComment(comment) {
    this.setState({ parentCommentId: comment.id })
    this.refs.comment.value = `@${comment.account.full_name}, `
  }

  updateComment(comment) {
    this.setState({ commentId: comment.id, parentCommentId: comment.parent_comment_id })
    this.refs.comment.value = comment.body
  }

  keyDown = ({ key }) => {
    if (key === 'Enter') {
      this.sendComment()
    }
  }

  render() {
    const { openFullRecord, editPost } = this.state
    const { post, dispatch, showGallery, user } = this.props
    return (
      <div className={cn()}>
        {editPost ? (
          <NewPost
            form={'EditPost'}
            post={post}
            closePost={() => this.setState({ editPost: false })}
          />
        ) : (
          <div>
            <div className={cn('header')}>
              <div className={cn('data')}>
                <img
                  className={cn('avatar')}
                  src={post.author.photo.thumb.url}
                  alt={post.author.full_name}
                />
                <section className={cn('wrapper-name-date')}>
                  <Link
                    to={`/employees/${post.author_id}`}
                    className={cn('data-owner-last-first-name').mix('link link_theme_light_third')}
                    title="Перейти на страницу сотрудника"
                  >
                    {post.author.full_name}
                  </Link>
                  <time className={cn('data-date-time').mix('p4 p4_theme_light_second')} dateTime="2017-12-18">
                    {moment(post.created_at).format('DD.MM.YYYY, HH:mm')}
                  </time>
                </section>
              </div>
              <div className={cn('control-panel')}>
                <div className={cn('wrapper-icon')}>
                  {post.can_edit && (
                    <span title="Редактировать" onClick={() => this.setState({ editPost: true })}>
                      <Pencil className={cn('pencil-icon')} />
                    </span>
                  )}
                  {post.can_delete && (
                    <span onClick={() => dispatch(deletePost(post.id))}>
                      <Trash className={cn('trash-icon')} />
                    </span>
                  )}
                  {post.in_favorites ? (
                    <span
                      onClick={() => dispatch(delInFavorites(post.id))}
                      title="Удалить из избранного"
                    >
                      <Star className={cn('favorites-icon')} />
                    </span>
                  ) : (
                    <span
                      onClick={() => dispatch(setInFavorites(post.id))}
                      title="Добавить в избранное"
                    >
                      <Star outline className={cn('favorites-icon')} />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={cn('preview')}>
              {openFullRecord ? (
                <p className={cn('text').mix('p1 p1_theme_light_first')}>
                  {
                    this.formatPost(post.body)
                  }
                </p>
              ) : (
                <p className={cn('text').mix('p1 p1_theme_light_first')}>
                  {
                    post.body.length > 2000
                      ? this.formatPost(post.body.slice(0, post.body.indexOf(' ', 2000)))
                      : this.formatPost(post.body)
                  }
                </p>
              )}
            </div>
            {post.body.length > 2000 && (
              <span
                className={cn('full-record-link').mix('link link_theme_light_third').state({ open: openFullRecord })}
                onClick={() => this.setState({ openFullRecord: !openFullRecord })}
              >
                {openFullRecord ? 'Скрыть' : 'Показать полностью…'}
              </span>
            )}
            {post.photos.length > 0 && (
              <div className={cn('document-group')}>
                <div className={cn('document-wrapper')}>
                  {post.photos.map((photo, idx) => (
                    <img
                      key={Math.random()}
                      src={photo.file.for_community.url}
                      alt={photo.name}
                      onClick={() => showGallery(post.photos, idx)}
                      className={cn('image').mix('cur')}
                    />
                  ))}
                </div>
              </div>
            )}
            {post.documents.length > 0 && (
              <div className={cn('document-group')}>
                {post.documents.map(doc => (
                  <div key={Math.random()} className={cn('document-wrapper')}>
                    <a
                      href={doc.file.url}
                      className={cn('document-name').mix('link link_theme_light_third')}
                      title="Скачать"
                      target="_blank"
                    >
                      {doc.name}
                    </a>
                    {/*<span className={cn('document-extension-wt')}>{doc.extension}</span>*/}
                  </div>
                ))}
              </div>
            )}
            <div className={cn('wrapper-like-comment')}>
              <div className={cn('wrapper-icon')} title="Мне нравится">
                {post.already_liked ? (
                  <span onClick={() => dispatch(dislike(post.id))}>
                    <Like className={cn('like-filled-icon')} />
                  </span>
                ) : (
                  <span onClick={() => dispatch(like(post.id))}>
                    <Like status={'outline'} className={cn('like-icon')} />
                  </span>
                )}
                <span className={cn('count').mix('p4 p4_theme_light_second')}>{post.likes_count}</span>
              </div>
              <div className={cn('vertical-line')} />
              <div className={cn('wrapper-icon')} title="Комментарии">
                <Comment className={cn('chat-icon')} />
                <span className={cn('count').mix('p4 p4_theme_light_second')}>{post.comments_count}</span>
              </div>
            </div>
          </div>
        )}
        {post.allow_commenting && (
          <Comments
            post={post}
            answerComment={commentId => this.answerComment(commentId)}
            updateComment={comment => this.updateComment(comment)}
          />
        )}
        {post.allow_commenting && (
          <div className={cn('write-a-comment')}>
            <img className={cn('avatar')} src={user.photo.thumb.url} alt={user.full_name} />
            <div className={cn('form-comment').mix('form-group')}>
              <input
                className="form-control"
                name="comment"
                type="text"
                ref="comment"
                placeholder="Написать комментарий..."
                onKeyDown={this.keyDown}
              />
              <button
                className={cn('btn-comment')}
                title="Отправить"
                onClick={() => this.sendComment()}
              >
                <Plane className={cn('plane-icon')} />
              </button>
            </div>
          </div>
        )}
        {!post.allow_commenting && (
          <div className={cn('write-a-comment')}>
            Автор запретил комментирование.
          </div>
        )}
      </div>
    )
  }
}

export default connector(Post)
