import React, { Component } from 'react'
import Comment from './Comment'

const cn = require('bem-cn')('intranet-news')

if (process.env.BROWSER) {
  require('./Container.css')
}

class Comments extends Component {
  state = {
    openFullComment: false,
  }

  render() {
    const { openFullComment } = this.state
    const { post, post: { comments_list }, answerComment, updateComment } = this.props
    return (
      <div className={cn('comments-wrapper')} id="comments">
        {comments_list.length > 3 && (
          <span
            className={cn('full-comment-link').state({ open: openFullComment })}
            onClick={() => this.setState({ openFullComment: !openFullComment })}
          >
            {openFullComment ? 'Скрыть' : 'Все комментарии'}
          </span>
         )}
        {openFullComment &&
          comments_list
            .slice(0, -3)
            .map(comment => (
              <Comment
                comment={comment}
                post={post}
                key={comment.id}
                answerComment={answerComment}
                updateComment={updateComment}
                {...this.props}
              />
            ))}
        {comments_list
          .slice(-3)
          .map(comment => (
            <Comment
              comment={comment}
              post={post}
              key={comment.id}
              answerComment={answerComment}
              updateComment={updateComment}
              {...this.props}
            />
          ))}
      </div>
    )
  }
}

export default Comments
