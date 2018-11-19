import React, { Component } from 'react'
import { v4 } from 'uuid'

import { BLINDS_TABS, NOTIFICATIONS_DATA } from './data'
import Notification from './Notification'

const cn = require('bem-cn')('user-notification')
if (process.env.BROWSER) {
  require('./UserNotification.css')
}

export default class Tabs extends Component {
  state = {
    blinds_tabs: BLINDS_TABS,
    currentTab: BLINDS_TABS[0].nameTab,
    notifications: NOTIFICATIONS_DATA,
  }

  render() {
    const { blinds_tabs, currentTab, notifications } = this.state

    return (
      <div className={cn('wrap')}>
        <h2>Уведомления</h2>
        <ul className={cn('tabs-list')}>
          {blinds_tabs.map(it => (
            <li
              key={v4()}
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ current: currentTab === `${it.nameTab}` })}
              onClick={() => this.setState({ currentTab: `${it.nameTab}` })}
            >
              <p className={cn('tabs-list-item-text')}>{it.title}</p>
            </li>
          ))}
        </ul>
        <div>
          {currentTab === 'all' &&
            notifications.map(it => (
              <Notification
                key={v4()}
                read={it.read}
                photo_user={it.photo_user}
                date_time={it.date_time}
                user_name={it.user_name}
                name_publication={it.name_publication}
                text_comment={it.text_comment}
              />
            ))}
          {currentTab === 'work' &&
            notifications.map(it => (
              <Notification
                key={v4()}
                read={it.read}
                photo_user={it.photo_user}
                date_time={it.date_time}
                user_name={it.user_name}
                name_publication={it.name_publication}
                text_comment={it.text_comment}
              />
            ))}
          {currentTab === 'social' &&
            notifications.map(it => (
              <Notification
                key={v4()}
                read={it.read}
                photo_user={it.photo_user}
                date_time={it.date_time}
                user_name={it.user_name}
                name_publication={it.name_publication}
                text_comment={it.text_comment}
              />
            ))}
          {currentTab === 'common' &&
            notifications.map(it => (
              <Notification
                key={v4()}
                read={it.read}
                photo_user={it.photo_user}
                date_time={it.date_time}
                user_name={it.user_name}
                name_publication={it.name_publication}
                text_comment={it.text_comment}
              />
            ))}
        </div>

      </div>
    )
  }
}
