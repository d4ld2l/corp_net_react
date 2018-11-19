import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-router-dom'

import { Bell } from '../../Icon'

const cn = require('bem-cn')('user-notification')

if (process.env.BROWSER) {
  require('./UserNotification.css')
}

class UserNotification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openUserMenu: false,
    }
  }

  handleClickOutside = () => {
    this.handkerCloseUserMenu()
  }

  handkerOpenUserMenu = () => {
    this.setState({ openUserMenu: true })
  }

  handkerCloseUserMenu = () => {
    this.setState({ openUserMenu: false })
  }

  render() {
    const { openUserMenu } = this.state
    const count_notification = 100
    const size = { width: '20px', height: '20px' }
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
            <ul className={cn('menu-list').mix('lsn pl0 mb0')}>
              {[1, 2, 3].map((e, i) => (
                <li className={cn('menu-list-item')} key={i}>
                  <span className={cn('menu-list-title')}>
                    Текстовое описание уведомления без особого форматирования
                  </span>
                  <Link
                    onClick={this.handkerCloseUserMenu}
                    to={'/recruitment/my'}
                    className={cn('menu-list-link')}
                  >
                    Ссылка на вакансию
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default onClickOutside(UserNotification)
