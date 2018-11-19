import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('user-notification')

export default class BtnAllNotifications extends Component {
  render() {
    return (
      <div>
       <Link className={cn('all-notifications btn btn-primary btn_padding-18-20')} to={`/notifications`}>
         показать все
       </Link>
      </div>
    )
  }
}
