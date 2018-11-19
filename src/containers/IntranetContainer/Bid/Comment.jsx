import React, { Component } from 'react'
import {deleteComment, getBidComment, sendComment, updateComment} from "../../../redux/actions/bidsActions";
import {toastr} from "react-redux-toastr";
import moment from "moment/moment";
import {replace} from "lodash";
import { Row, Col, FormGroup } from 'react-bootstrap'
import { Close, Pencil } from 'components-folder/Icon'
import NewComment from './NewComment'
import get from 'lodash/get'

const cn = require('bem-cn')('intranet-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

function bytesToSize(bytes) {
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
}

export default class Comment extends Component {
  // state = { actions: false }
  state = {
    edit: false,
  }

  deleteComment = async (commentId) => {
    const { bid, dispatch } = this.props
    if (confirm('Вы уверены?')) {
      const res = await dispatch(deleteComment(bid, commentId))
      if (res.status !== 200) {
        toastr.error('На сервере ошибки, повторите попытку позже')
      }
    }
  }


  kitcut(text, limit) {
    let {lastSpace} = this.state
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    lastSpace = text.lastIndexOf(" ");
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace);
    }
    return text + "...";
  }

  render() {
    const {user, comment, bid} = this.props
    const { edit } = this.state
    return (
      <div className={cn()}>
        {(edit) ? (
          <NewComment
            form={'EditComment'}
            key={comment.id + user.id}
            comment={comment}
            bid={bid}
            closeComment={() => this.setState({edit: false})}
          />
        ) : (
          <Col>
            <div className={cn('aside-label')}>
              {user.id === get(comment, 'account.id') ? (

                <div className={'indent_3'}>
                  <span className={cn('commenter_name-position').mix('p3 p3_theme_light')}>{comment.account.surname_with_firstname}, </span>
                  <span className={cn('comment_date').mix('p3 p3_theme_light')}> {moment(comment.created_at).format('DD.MM.YYYY, HH:mm')}</span>
                  <section className={cn('inner-control-panel')}>
                    <span title="Редактировать" onClick={() => this.setState({edit: true})}>
                      <Pencil className={cn('pencil-icon')}/>
                    </span>
                    <span title="Удалить" onClick={() => this.deleteComment(comment.id)}>
                    <Close className={cn('trash-icon')}/>
                  </span>
                  </section>
                </div>) : (<span className={cn()}>{moment(comment.created_at).format('DD.MM.YYYY, HH:mm')}, {get (comment, 'account.surname_with_firstname')}</span>)
              }
            </div>
            <div className={cn('aside-content')}>
              {comment.body}
            </div>
            <div>
              {comment.documents &&
              comment.documents.length > 0 &&
              <div className={cn('inner-content-comment')}>
                {comment.documents.map((document, index) => (
                  <div key={index}>
                    <a href={document.file.url}>
                    <span
                      title={replace(document.name, document.extension, '')}>{this.kitcut((replace(document.name, document.extension, '')), 30)}</span>
                      {`${document.extension}, `}
                      {bytesToSize(document.size)}
                    </a>
                  </div>
                ))}
              </div>
              }
            </div>
          </Col>
        )}
      </div>
    )
  }
}
