import React, { Component } from 'react'
import moment from 'moment'
import {
  Arrow,
  Plane,
} from 'components-folder/Icon/'
import { addCommentCustomerContact } from '../../../../redux/actions/customerContactsActions'
import {connect} from "react-redux"

moment.locale('ru')

const cn = require('bem-cn')('customers')

const connector = connect(state => ({
  currentUser: state.user
}))

class CommentsCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.defaultOpen,
      value: ''
    }
  }

  openCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { dispatch, customerId, contactId } = this.props
    const { value } = this.state
    await dispatch(addCommentCustomerContact(customerId, contactId,  value))
    this.setState({ value: '' })
  }

  commentAuthor = (comment) => {
    if (comment.account) {
      return comment.account.full_name
    } else {
      const { currentUser } = this.props
      return `${currentUser.surname} ${currentUser.name} ${currentUser.middlename}`
    }
  }

  render() {
    const { isOpen, value } = this.state
    const { comments } = this.props

    return (
      <div>
        <div className={cn('collapse')} style={{ paddingBottom: isOpen ? '0' : '20px' }}>
          <div className={cn('collapse-head')} onClick={this.openCollapse}>
            <h2 className={cn('name')}>
              Комментарии
              <sup className={cn('count')}>
                {comments.length}
              </sup>
            </h2>
            <span onClick={this.openCollapse}>
              {isOpen ? (
                <Arrow className={cn('open-icon')} />
              ) : (
                <Arrow className={cn('close-icon')} />
              )}
            </span>
          </div>

          {isOpen && (
            <div className={cn('body')}>
              <div className={cn('write-a-comment')}>
                <form className={cn('form-comment').mix('form-group')}
                      onSubmit={this.handleSubmit}
                >
                  <input
                    className="form-control"
                    name="comment"
                    type="text"
                    ref="comment"
                    placeholder="Написать комментарий..."
                    value={value}
                    onChange={this.handleChange}
                  />
                  <button
                    className={cn('btn-comment')}
                    title="Отправить"
                    type="submit"
                  >
                    <Plane className={cn('plane-icon')} />
                  </button>
                </form>
              </div>
              <div className={cn('body-comment').mix('comment')}>
                {comments.map(comment => (
                  <div key={comment.id} className="comment__wrapper">
                    <p className="p3 p3_theme_light indent_reset">
                      {this.commentAuthor(comment)}
                      {', '}
                      {moment(comment.created_at).format('DD.MM.YYYY')}
                    </p>
                    <p className='p1 p1_theme_light_first'>
                      { comment.body }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connector(CommentsCollapse)
