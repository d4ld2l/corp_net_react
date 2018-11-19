import React, { Component } from 'react'
import CommentItem from './CommentItem'
import SystemMessage from './SystemMessage'
import { first, last } from 'lodash'

import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('notify-note-card-comments')
let VisibilitySensor = () => <div />
if (process.env.BROWSER) {
  VisibilitySensor = require('react-visibility-sensor').default
}

export default class NoteCardComments extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.topics.comments.length === 0 && this.props.topics.comments.length !== 0) {
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

  onChange = (isVisible, comment) => {
    const {
      topics: { discussions, loading },
    } = this.props
    const {
      topics: {
        comments,
        activeDiscussion,
        loadingUpComments,
        loadingDownComments,
        nextCommentsUpPage,
        nextCommentsDownPage,
        commentsBottomTriggerId,
        commentsTopTriggerId,
      },
      loadUpComments,
      loadDownComments,
      unreadedCommentBecomeVisible,
    } = this.props
    if (
      isVisible &&
      nextCommentsDownPage &&
      !loadingDownComments &&
      commentsBottomTriggerId === comment.id
    )
      loadDownComments()
    if (
      isVisible &&
      nextCommentsUpPage &&
      !loadingUpComments &&
      commentsTopTriggerId === comment.id
    )
      loadUpComments()
    if (!comment.read) unreadedCommentBecomeVisible([activeDiscussion.id, comment.id])
  }
  render() {
    const {
      topics: { comments, loadingUpComments, loadingDownComments },
    } = this.props
    return (
      <div className={cn}>
        {loadingUpComments && !loadingDownComments && (
          <div style={{ height: '150px' }}>
            <Loader />
          </div>
        )}
        {comments.map((it, i) => (
          <VisibilitySensor
            key={it.id}
            onChange={isVisible => this.onChange.call(this, isVisible, it)}
            resizeCheck={true}
            scrollCheck={true}
          >
            {it.service ? (
              <SystemMessage comment={it} color="#fff" {...this.props} />
            ) : (
              <CommentItem comment={it} {...this.props} />
            )}
          </VisibilitySensor>
        ))}
        {loadingDownComments && (
          <div style={{ height: '150px' }}>
            <Loader />
          </div>
        )}
      </div>
    )
  }
}
