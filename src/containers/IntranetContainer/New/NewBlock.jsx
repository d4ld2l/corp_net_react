import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import NewCarousel from './NewCarousel'
import NewContainerArticle from './NewContainerArticle'
import { Women } from 'components-folder/Icon'
import Comments from './Comments'
import { sendComment, updateComment, like, dislike } from '../../../redux/actions/newsActions'
import scrollToComponent from "components-folder/ScrollToComponent";
import {
  Like,
  Comment,
  Plane,
} from 'components-folder/Icon'


const cn = require('bem-cn')('new-block')
if (process.env.BROWSER) {
  require('./new-block.css')
}

export default class NewBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parentCommentId: null,
      commentId: null,
    }
  }

  answerComment(comment) {
    this.setState({ parentCommentId: comment.id })
    this.refs.comment.value = `@${comment.account.full_name}, `
    scrollToComponent(this.refs.comment, { offset: 0, duration: 1000})

  }

  updateComment(comment) {
    this.setState({ commentId: comment.id, parentCommentId: comment.parent_comment_id })
    this.refs.comment.value = comment.body
    scrollToComponent(this.refs.comment, { offset: 0, duration: 1000})
  }

  sendComment() {
    if (this.refs.comment.value) {
      const { current, dispatch } = this.props
      if (this.state.commentId) {
        const comment = {
          body: this.refs.comment.value,
          id: this.state.commentId,
        }
        if (this.state.parentCommentId) {
          comment.parent_comment_id = this.state.parentCommentId
        }
        dispatch(updateComment(current.id, comment)).then(() => {
          this.setState({ parentCommentId: null, commentId: null })
          this.refs.comment.value = ''
        })
      } else {
        dispatch(
          sendComment(current.id, this.refs.comment.value, this.state.parentCommentId)
        ).then(() => {
          this.setState({ parentCommentId: null })
          this.refs.comment.value = ''
        })
      }
    }
  }

  keyDown = ({ key }) => {
    if (key === 'Enter') {
      this.sendComment()
    }
  }

  render() {
    const { current, user, dispatch } = this.props

    return (
      <div>
        <div className={cn}>
          <Row>
            <Col xs={12}>
              <h4 className={cn('preview')}>{current.preview}</h4>
            </Col>
          </Row>
          {current.photos && current.photos.length ? <NewCarousel current={current} /> : ''}
          <NewContainerArticle current={current} />
          {/* TODO: mark */}
        </div>

        {/*<div className={cn('b-info')}>*/}
          {/*<div className={cn('wrapper-image')}>*/}
            {/*<Women className={cn('b-info-image')} />*/}
          {/*</div>*/}
          {/*<p className={cn('b-info-text')}>*/}
            {/*Рекомендую оформить заявку заранее, тогда согласование и утверждение пройдет быстрее.*/}
          {/*</p>*/}
        {/*</div>*/}
        <div className={cn('wrapper-like-comment')}>
          <div className={cn('wrapper-icon')} title="Мне нравится">
            {current.already_liked ? (
              <span onClick={() => dispatch(dislike(current.id))}>
              <Like className={cn('like-filled-icon')} />
              </span>
            ) : (
              <span onClick={() => dispatch(like(current.id))}>
             <Like status={'outline'} className={cn('like-icon')} />
             </span>
            )}
            <span className={cn('count')}>{current.likes_count}</span>
          </div>
          <div className={cn('vertical-line')} />
          <div className={cn('wrapper-icon')} title="Комментарии">
            <Comment className={cn('chat-icon')} />
            <span className={cn('count')}>{current.comments_count}</span>
          </div>
        </div>
        {current.allow_commenting && (
          <Comments
            post={current}
            answerComment={commentId => this.answerComment(commentId)}
            updateComment={comment => this.updateComment(comment)}
            {...this.props}
          />
        )}
        {current.allow_commenting && (
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
        {!current.allow_commenting && (
          <div className={cn('write-a-comment')}>
            Автор запретил комментирование.
          </div>
        )}
      </div>
    )
  }
}
