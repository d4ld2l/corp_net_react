import React, { Component } from 'react'
import { Close } from 'components-folder/Icon/'
import Form from './Form'
import { v4 } from 'uuid'

export const cn = require('bem-cn')('notify-create-discussion')

export default class CreateDiscussion extends Component {
  close = () => {
    const { dispatch, closeAll } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND' })
    closeAll()
  }

  isShow = () => {
    const { dispatch, isShow, isSearch, isFilter, isCreateDiscussion } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND', payload: !isShow })
    dispatch({ type: 'CREATE_DISCUSSION', payload: !isCreateDiscussion })
    isSearch && dispatch({ type: 'TOGGLE_SEARCH', payload: false })
    isFilter && dispatch({ type: 'TOGGLE_FILTER', payload: false })
  }

  render() {
    const {
      topics: { activeDiscussion },
      closeAll,
    } = this.props
    return (
      <div className={cn}>
        <div className={cn('head')}>
          <div className={cn('wrap')}>
            <h1 className={'aside-head__h1'}>
              {activeDiscussion.id ? 'Редактирование' : 'Новое обсуждение'}
            </h1>
            <span title={'Закрыть'} onClick={() => this.close()}>
              <Close className={'aside-head__close'} />
            </span>
          </div>
        </div>
        <Form />
      </div>
    )
  }
}
