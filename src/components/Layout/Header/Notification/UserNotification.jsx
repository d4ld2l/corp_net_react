import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'

import { Bell } from '../../../Icon'
import {BLIND_DATA} from './data'
import Tabs from './Tabs'
import BtnAllNotifications from './BtnAllNotifications'
import { Close } from '../../../Icon'

const cn = require('bem-cn')('user-notification')

if (process.env.BROWSER) {
  require('./UserNotification.css')
}

class UserNotification extends Component {
  constructor(props) {
    super(props)

  }
  state = {
    isOpen: false,
    blind_data: BLIND_DATA
  }

  handleClickOutside = () => {
    this.handkerCloseUserMenu()
  }

  render() {
    const { openUserMenu } = this.state
    const count_notification = 100
    const size = { width: '20px', height: '20px', }

    return (
      <div className={cn}>
        <div
          className={cn('icons')
            .mix('cur')
            .state({ open: openUserMenu })}
          onClick={() => {
            if (openUserMenu) {
              this.handkerCloseUserMenu()
            } else {
              this.handkerOpenUserMenu()
            }
          }}
        >
          <div className={cn('icon-wrap')}>
            <Bell className={cn('icon')} />

            <div
              className={cn('count-block')}
              style={count_notification > 99 ? size : {}}
            >
              <span className={cn('count')}>
                {count_notification > 99 ? '99+' : count_notification}
              </span>
            </div>
          </div>
        </div>

        {openUserMenu && (
          <div className={cn('menu')}>
            <div className={cn('menu-wrapper')}>
              <div className={cn('wrap-icon')} onClick={this.handkerCloseUserMenu}>
                <Close className={cn('icon-close')} />
              </div>
              <Tabs />
              <BtnAllNotifications />
            </div>
          </div>
        )}
      </div>
    )
  }


  handkerOpenUserMenu = () => {
    this.setState({ openUserMenu: true })
  }

  handkerCloseUserMenu = () => {
    this.setState({ openUserMenu: false })
  }
}

export default onClickOutside(UserNotification)
