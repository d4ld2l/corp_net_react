import React, { Component } from 'react'
import Switch from 'react-ios-switch'

const cn = require('bem-cn')('milestone-notification')

if (process.env.BROWSER) {
  require('./Notification.css')
}

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { needNotification, onChange } = this.props

    return (
      <div className={cn}>
        <div className={cn('title')}>
          <span className={cn('title-text')}>Отправлять уведомления</span>

          <Switch
            checked={needNotification}
            disabled={false}
            handleColor={'#ffffff'}
            offColor={'#e8e8ed'}
            onChange={value => onChange(value)}
            onColor={'#2b2d4b'}
            // pendingOffColor={<color>}
          />
        </div>

        {needNotification && (
          <div className={cn('users')}>
            {[1, 2, 3].map((e, i) => (
              <div className={cn('users-item')} key={i}>
                <img src="/public/avatar.png" alt="user avatar" className={cn('users-avatar')} />

                <div className={cn('users-info')}>
                  <div className={cn('users-name')}>Николай Шпаковский</div>
                  <div className={cn('users-position')}>Должность</div>
                </div>

                <Switch
                  checked={false}
                  disabled={false}
                  handleColor={'#ffffff'}
                  offColor={'#e8e8ed'}
                  onChange={() => {}}
                  onColor={'#2b2d4b'}
                  // pendingOffColor={<color>}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
