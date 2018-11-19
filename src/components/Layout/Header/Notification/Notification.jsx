import React, { Component } from 'react'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'

import { Arrow } from '../../../Icon'

const cn = require('bem-cn')('user-notification')
if (process.env.BROWSER) {
  require('./UserNotification.css')
}

export default class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  render() {
    const { isOpen } = this.state
    const { read, photo_user, date_time, user_name, name_publication, text_comment } = this.props
    return (
      <div className={cn('collapse')}>
        <div
          className={cn('collapse-head')}
          onClick={this.openCollapse}
          style={isOpen ? { borderColor: 'transparent' } : {}}
        >
          <div className={cn('collapse-head-read')} style={read ? { background: '#ff2f51'} : { background: 'transparent'}}/>
          <div className={cn('collapse-head-photo')} style={{ background: `url(${photo_user}) center center / cover no-repeat` }} />
          <div className={cn('collapse-head-text')}>
            <time dateTime={date_time}>{date_time}</time>
            <p>
              {user_name} оставил(а) комментарий под вашей публикацией {name_publication}
            </p>
            {!isOpen && <Link className={cn('collapse-head-link')} to={`/`}>Перейти к комментарию</Link>}
          </div>


          <span onClick={this.openCollapse}>
            {isOpen ? (
              <Arrow className={cn('open-icon')} />
            ) : (
              <Arrow className={cn('close-icon')} />
            )}
          </span>
        </div>
        {isOpen && (
          <div className={cn('collapse-body')}>
            <p>{text_comment}</p>
            <Link className={cn('collapse-head-link')} to={`/`}>Перейти к комментарию</Link>
          </div>
        )}

      </div>
    )
  }
  openCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
