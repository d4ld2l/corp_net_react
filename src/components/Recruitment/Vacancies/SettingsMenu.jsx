import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'

import { updateState, getVacanciesStat } from '../../../redux/actions/vacanciesActions'

const cn = require('bem-cn')('settings-menu')

if (process.env.BROWSER) {
  require('./settings-menu.css')
}

const connector = compose(
  connect(state => ({
    role: state.role,
    user: state.user,
  })),
  onClickOutside
)

class SettingsMenu extends Component {
  updateStatus(id, status) {
    const { dispatch, actionCallback } = this.props
    dispatch(updateState(id, status)).then(() => {
      if (actionCallback) {
        actionCallback()
      } else {
        dispatch(getVacanciesStat())
      }
      this.handleClickOutside()
    })
  }
  handleClickOutside = () => {
    this.props.handlerClose()
  }

  render() {
    const { item, role } = this.props
    return (
      <div className={cn()}>
        <ul className={cn('list')}>
          <li className={cn('list-item')}>
            <Link to={`/recruitment/vacancies/${item.id}/edit${item.status === 'new' ? '#status_new' : ''}`} className={cn('list-item-link')}>Редактировать</Link>
          </li>
          {role.edit_vacancy && (
            <li className={cn('list-item')} onClick={() => this.updateStatus(item.id, 'archived')}>
              <a className={cn('list-item-link')}>Закрыть</a>
            </li>
          )}
          {role.edit_vacancy &&
            item.status === 'paused' && (
              <li className={cn('list-item')} onClick={() => this.updateStatus(item.id, 'worked')}>
                <a className={cn('list-item-link')}>
                  {item.status === 'paused' ? 'Вернуть' : 'Взять'} в работу
                </a>
              </li>
            )}
          {role.edit_vacancy &&
            item.status === 'worked' && (
              <li className={cn('list-item')} onClick={() => this.updateStatus(item.id, 'paused')}>
                <a className={cn('list-item-link')}>На паузу</a>
              </li>
            )}
        </ul>
      </div>
    )
  }
}

export default connector(SettingsMenu)
