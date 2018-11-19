import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('notifications')

export default class BtnMarkAllRead extends Component {
  render() {
    return (
      <div className={cn('group-button-box')}>
       <Link className={cn('mark-as-read btn btn-primary btn_padding-8-12')} to={`/notifications`}>
         Отметить все, как прочитанное
       </Link>
      </div>
    )
  }
}
