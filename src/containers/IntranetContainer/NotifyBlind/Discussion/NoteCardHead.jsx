import React, { Component } from 'react'

import { Arrow, Settings, Close } from 'components-folder/Icon'
import { v4 } from 'uuid'

const cn = require('bem-cn')('notify-note-card-head')

export default class NoteCardHead extends Component {
  state = {
    showSettings: false,
  }

  toggleSettings = () => {
    const { showSettings } = this.state
    this.setState({ showSettings: !showSettings })
  }

  backToIndex = () => {
    const { closeAll } = this.props
    closeAll()
  }

  close = () => {
    const { dispatch, closeAll } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND' })
    closeAll()
  }

  render() {
    const {
      user,
      topics: { activeDiscussion },
    } = this.props
    const { showEditForm, deleteTopics, openTopics, closeTopics, leaveTopic } = this.props
    const { showSettings } = this.state

    const setting_list =
      activeDiscussion.author_id === user.id
        ? [
            {
              label: 'Редактировать',
              onClick: () => showEditForm(activeDiscussion),
            },
            {
              label:
                activeDiscussion.state === 'closed' ? 'Открыть обсуждение' : 'Закрыть обсуждение',
              onClick:
                activeDiscussion.state === 'closed'
                  ? () => openTopics([activeDiscussion.id])
                  : () => closeTopics([activeDiscussion.id]),
            },
            {
              label: 'Удалить',
              onClick: () => deleteTopics([activeDiscussion.id]),
            },
          ]
        : activeDiscussion.status === 'active'
        ? [
            {
              label: 'Покинуть',
              onClick: () => leaveTopic(activeDiscussion.id),
            },
          ]
        : []

    return (
      <div className={cn}>
        <div className={cn('return')} title={'Вернуться назад'} onClick={this.backToIndex}>
          <span className={cn('arrow')}>
            <Arrow className={cn('arrow-icon')} />
          </span>
          <p className={cn('text_return')}>Вернуться к списку</p>
        </div>

        <div className={cn('func-elem')}>
          {setting_list.length > 0 && (
            <span title={showSettings ? 'Закрыть' : 'Открыть'} onClick={this.toggleSettings}>
              <Settings className={cn('setting').mix(showSettings && cn('setting_open'))} />
            </span>
          )}

          {showSettings && (
            <ul className={'append__list'}>
              {setting_list.map(it => (
                <li onClick={it.onClick} key={v4()} className={'append__item'}>
                  <span className={'append__text'}>{it.label}</span>
                </li>
              ))}
            </ul>
          )}

          <span title={'Закрыть'} onClick={this.close}>
            <Close className={'aside-head__close'} />
          </span>
        </div>
      </div>
    )
  }
}
