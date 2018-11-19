import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { get } from 'lodash'

import Loader from 'components-folder/Loader'
import Input from './Input'
import MultiFile from '../../MultiFile'
import { Plane, Lock } from 'components-folder/Icon'
import { cn } from '../index'

let KeyboardEventHandler = () => <div />
if (process.env.BROWSER) {
  KeyboardEventHandler = require('react-keyboard-event-handler/lib/react-keyboard-event-handler.min.js')
}

export default class Presenter extends Component {
  handleSubmit(e) {
    const { submit } = this.props
    e.preventDefault()
    submit()
  }

  render() {
    const { activeDiscussion, user, commentId, formValues } = this.props
    const { submitting, destroy, valid } = this.props
    const { editLastComment, destroyForm, joinTopic } = this.props
    const discussionIsClosed = activeDiscussion.state === 'closed'
    const btnIsDisabled = !formValues || discussionIsClosed || !valid || submitting
    if (activeDiscussion.status === 'available' && !discussionIsClosed)
      return (
        <button
          className={cn('btn-comment').mix('full_border')}
          title="Присоединиться к обсуждению"
          onClick={() => joinTopic(activeDiscussion.id)}
        >
          Присоединиться к обсуждению
        </button>
      )
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {commentId && (
          <div className={cn('cancel-edit')}>
            <a onClick={destroyForm}>Отменить редактирование</a>
          </div>
        )}
        <div className={cn('write-a-comment')}>
          {!discussionIsClosed && (
            <img className={cn('avatar')} src={user.photo.url} alt={'musk'} />
          )}
          <div className={cn('form-comment').mix('form-group').mix('extend-span')}>
            <KeyboardEventHandler
              handleKeys={['up']}
              onKeyEvent={async () => {
                const res = await editLastComment()
              }} >
              <Field
                disabled={discussionIsClosed || submitting}
                name="body"
                id="body"
                type="text"
                placeholder={discussionIsClosed ? 'Обсуждение закрыто...' : 'Написать комментарий...'}
                component={Input}
              />
            </KeyboardEventHandler>
            <button
              disabled={btnIsDisabled}
              className={cn('btn-comment').state({
                disabled: btnIsDisabled,
              })}
              title="Отправить"
            >
              {discussionIsClosed ? (
                <Lock className={cn('plane-icon')} />
              ) : (
                <Plane className={cn('plane-icon')} />
              )}
            </button>
          </div>
        </div>
        {!discussionIsClosed && (
          <FieldArray name="attachment" component={MultiFile} disabled={submitting} />
        )}
      </form>
    )
  }
}
