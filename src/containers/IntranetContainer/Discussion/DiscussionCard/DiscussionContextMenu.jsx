import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { cn } from './index'

class DiscussionContextMenu extends Component {
  handleClickOutside = () => {
    this.props.handlerClose()
  }
  render() {
    return (
      <div className={cn('setting-menu')}>
        <ul className={cn('setting-list')}>
          <li className={cn('setting-item')}>
            <a className={cn('setting-link')}>Редактировать</a>
          </li>
          <li className={cn('setting-item')}>
            <a className={cn('setting-link')}>Удалить</a>
          </li>
          <li className={cn('setting-item')}>
            <a className={cn('setting-link')}>Выйти из топика</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default onClickOutside(DiscussionContextMenu)
