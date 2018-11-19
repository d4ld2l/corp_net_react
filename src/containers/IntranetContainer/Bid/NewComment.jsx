import React, { Component } from 'react'
import MultiFile from "components-folder/Form/MultiFile";
import {Field, reduxForm, FieldArray} from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import onClickOutside from 'react-onclickoutside'
import {getBidComment, sendComment, updateComment, createComment} from "../../../redux/actions/bidsActions";
import { Plane } from 'components-folder/Icon'
import {toastr} from "react-redux-toastr";
import {compose, pick} from "ramda";
import {connect} from "react-redux";


const cn = require('bem-cn')('intranet-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

const connector = compose(connect(pick(['bid', 'loaders', 'user'])), reduxForm(), onClickOutside)

class NewComment extends Component {
  state = {
    openMessage: true,
  }

  componentDidMount() {
    const { comment, initialize } = this.props
    if (comment) {
      const data = {
        comment: comment.body,
        attachment: [],
        id: comment.id,
      }
      if (comment.documents.length) {
        comment.documents.forEach(doc => {
          data.attachment.push({
            file: doc.file.url,
            name: doc.name,
            target: 'doc',
            id: doc.id,
          })
        })
      }
      initialize(data)
    }
  }

  keyDown = ({ key }) => {
    if (key === 'Enter') {
      this.sendComment()
    }
  }

  handleClickOutside = () => {
    const { comment, closeComment } = this.props
    if (comment) {
      closeComment()
    }
  }

  sendComment = async () =>  {
    const { bid, dispatch, user, comment, closeComment, initialize } = this.props
    let res = {}
    if ( this.refs.bidComment.value && this.refs.bidComment.value !== '' ) {
      if (comment){
        res = await dispatch(updateComment(bid, comment.id))
      } else {
        res = await dispatch(sendComment(bid, user.id))
      }
      if (res.status === 200) {
        if (comment) {
          closeComment()
        } else {
          initialize()
        }
      } else {
        toastr.error('На сервере ошибки, повторите попытку позже')
      }
    }
  }

  render = () => {
    const {bid, comment, handleSubmit} = this.props

    return (
      <section className={cn('comment-wrapper')}>
        <div className={cn('form_comment')}>
          {
            comment ? ('') : (
              <div className={cn('word_comment')}>
                <h4>Комментарий</h4>
                <div className={cn('header_of_word_comment').mix('p4 p4_theme_light_third')}>
                  {bid.comments.length}
                </div>
              </div>
            )
          }
          <div className={cn('form-comment').mix('form-group')}>
            <Field
              ref="bidComment"
              component="input"
              name="comment"
              className="form-control"
              placeholder="Оставьте комментарий"
              onKeyDown={this.keyDown}
            />
            <button
              className={cn('btn-comment')}
              title="Отправить"
              onClick={() => this.sendComment()}
            >
              <Plane className={cn('plane-icon')}/>
            </button>
          </div>
        </div>
        <div className={cn('b-upload-file')}>
          <FieldArray
            key={ (comment && 'edit'+ comment.id) || bid.id }
            name="attachment"
            component={MultiFile}
            multiple
            label={'Прикрепить документ'}
          />
        </div>
      </section>
    )
  }
}

export default connector(NewComment)
