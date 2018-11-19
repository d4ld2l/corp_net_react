import React, { Component } from 'react'

import { Arrow, Settings, Close } from 'components-folder/Icon/'
import { v4 } from 'uuid'

const cn = require('bem-cn')('notify-note-card-head')

const setting_list = [{ label: 'Действие 1' }, { label: 'Действие 2' }]

export default class NoteCardHead extends Component {
  backToIndex = () => {
    const {
      showCard,
      topics: { activeDiscussion },
    } = this.props
    showCard(activeDiscussion)
  }

  close = () => {
    const { dispatch, closeAll } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND' })
    closeAll()
  }

  render() {
    return (
      <div className={cn}>
        <div className={cn('return')} title={'Вернуться назад'} onClick={this.backToIndex}>
          <span className={cn('arrow')}>
            <Arrow className={cn('arrow-icon')} />
          </span>
          <p className={cn('text_return')}>Вернуться к обсуждению</p>
        </div>

        <div className={cn('func-elem')}>
          <span title={'Закрыть'} onClick={this.close}>
            <Close className={'aside-head__close'} />
          </span>
        </div>
      </div>
    )
  }
}
