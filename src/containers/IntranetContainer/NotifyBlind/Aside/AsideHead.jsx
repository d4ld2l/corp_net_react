import React, { Component } from 'react'
import { v4 } from 'uuid'
import { Route } from 'react-router-dom'

import { Close, Plus } from 'components-folder/Icon/'
import { header } from '../data'

const cn = require('bem-cn')('aside-head')

export default class AsideHead extends Component {
  state = {
    showAddMenu: false,
  }

  toggleAddMenu = () => {
    const { showAddMenu } = this.state
    this.setState({ showAddMenu: !showAddMenu })
  }

  newDiscussion = () => {
    const { dispatch, showCreateForm } = this.props
    dispatch({ type: 'NOTIFY_BLIND_CHANGE_VIEW', payload: { tab: 'discussions', view: 'new' } })
    showCreateForm()
  }

  // newTask = () => {
  //   const { dispatch } = this.props
  //   dispatch({ type: 'NOTIFY_BLIND_CHANGE_VIEW', payload: { tab: 'tasks', view: 'new' } })
  // }

  close = () => {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND' })
  }

  render() {
    const { showAddMenu } = this.state
    const { className, toggleTaskForm, enabledComponents } = this.props

    let append_list = []
    if (enabledComponents.shr_discussions)
      append_list.push({ label: 'Новое обсуждение', onClick: this.newDiscussion })
    if (enabledComponents.recruitment_tasks || enabledComponents.shr_tasks)
      append_list.push({ label: 'Новая задача', onClick: toggleTaskForm })

    return (
      <div className={cn.mix(className)}>
        <div className={cn('wrap')}>
          <h1 className={cn('h1')}>
            {header.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.header} />
            ))}
          </h1>

          <div className={cn('append').mix('append')}>
            <span
              className={'append__wrap'}
              title={showAddMenu ? 'Закрыть' : 'Открыть'}
              onClick={this.toggleAddMenu}
            >
              <span className={'append__underlying-layer'} />
              <Plus
                outline={'filled'}
                className={'append__icon' + (showAddMenu ? ' append__icon_open' : '')}
              />
            </span>

            {showAddMenu && (
              <ul className={'append__list'}>
                {append_list.map(it => (
                  <li key={v4()} className={'append__item'} onClick={it.onClick}>
                    <span className={'append__text'}>{it.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <span title={'Закрыть'} onClick={this.close}>
          <Close className={cn('close')} />
        </span>
      </div>
    )
  }
}
