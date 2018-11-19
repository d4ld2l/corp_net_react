import React, { Component } from 'react'
import { first, last, get, compact } from 'lodash'

import Loader from 'components-folder/Loader'
import Comment from './Comment'
import SystemMessage from './SystemMessage'

export const cn = require('bem-cn')('discussion-comments')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.comments = []

    this.handleScroll = this.handleScroll.bind(this)
    this.markUnreadedComments = this.markUnreadedComments.bind(this)
    this.findCommentAtPosition = this.findCommentAtPosition.bind(this)
  }

  componentDidMount() {
    this.commentsScroll.addEventListener('scroll', this.handleScroll)
    setTimeout(this.markUnreadedComments, 400)
  }

  componentWillUnmount() {
    this.commentsScroll.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDiscussion.id !== this.props.activeDiscussion.id)
      setTimeout(this.markUnreadedComments, 400)
    if (prevProps.comments.length !== this.props.comments.length)
      setTimeout(this.markUnreadedComments, 400)
    if (prevProps.comments.length === 0 && this.props.comments.length !== 0) {
      const readedComments = document.querySelectorAll(
        `.discussion-comments__item:not(.discussion-comments__item_unread)`
      )
      if (readedComments.length > 0) {
        last(readedComments).scrollIntoView()
      } else {
        const unreadedComments = document.querySelectorAll(`.discussion-comments__item_unread`)
        unreadedComments.length > 0 && first(unreadedComments).scrollIntoView()
      }
    }
  }

  handleScroll() {
    const {
      loadingUpComments,
      loadingDownComments,
      nextCommentsUpPage,
      nextCommentsDownPage,
      loadUpComments,
      loadDownComments,
    } = this.props
    const el = this.commentsScroll
    const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop
    const LoadingTrigger = (el.clientHeight + el.offsetTop) / 2
    if (scrollBottom < LoadingTrigger && nextCommentsDownPage && !loadingDownComments) {
      loadDownComments()
    }
    if (el.scrollTop < LoadingTrigger && nextCommentsUpPage && !loadingUpComments) {
      loadUpComments()
    }
    this.markUnreadedComments()
  }

  markUnreadedComments() {
    const { unreadedCommentBecomeVisible, activeDiscussion } = this.props
    const { comments, commentsScroll } = this
    const comment = get(
      this.findCommentAtPosition(commentsScroll.offsetHeight + commentsScroll.scrollTop),
      'props.comment',
      get(last(compact(comments)), 'props.comment', {
        id: 0,
        read: activeDiscussion.is_read,
      })
    )
    if (!comment.read) unreadedCommentBecomeVisible([activeDiscussion.id, comment.id])
  }

  findCommentAtPosition(offset) {
    const { comments } = this
    let acc = 0
    return compact(comments).find(it => {
      acc = acc + it.container.clientHeight
      return acc >= offset
    })
  }

  render() {
    // Data
    const { user, activeDiscussion, comments, loadingUpComments, loadingDownComments } = this.props

    // Actions
    const { likeComment, dislikeComment, editComment, deleteComment } = this.props
    return (
      <div
        className={cn('wrapper').mix('global-scroll global-scroll_theme_light')}
        ref={node => (this.commentsScroll = node)}
      >
        {loadingUpComments && !loadingDownComments && (
          <div style={{ height: '150px' }}>
            <Loader />
          </div>
        )}
        {comments.map((it, i) =>
          it.service ? (
            <SystemMessage
              key={`comment-${it.id}`}
              comment={it}
              ref={node => (this.comments[i] = node)}
            />
          ) : (
            <Comment
              key={`comment-${it.id}`}
              comment={it}
              ref={node => (this.comments[i] = node)}
              activeDiscussion={activeDiscussion}
              user={user}
              editComment={editComment}
              deleteComment={deleteComment}
              likeComment={likeComment}
              dislikeComment={dislikeComment}
            />
          )
        )}
        {loadingDownComments && (
          <div style={{ height: '150px' }}>
            <Loader />
          </div>
        )}
      </div>
    )
  }
}
