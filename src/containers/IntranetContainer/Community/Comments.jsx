import React, { Component } from 'react'
import Comment from './Comment'

const cn = require('bem-cn')('publication')

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
      <div className={cn('comments-wrapper')}>
        {comments_list.length > 3 && (
          <span
            className={cn('full-comment-link').mix('link link_pseudo link_theme_light_third').state({ open: openFullComment })}
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
            />
          ))}
      </div>
    )
  }
}

export default Comments
