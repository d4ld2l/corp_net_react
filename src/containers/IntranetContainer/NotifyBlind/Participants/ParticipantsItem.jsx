import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('notify-participants-item')

export default class ParticipantsItem extends Component {
  render() {
    const { member } = this.props
    return (
      <div className={cn}>
        <div
          className={cn('photo')}
          style={{
            background: `url('${
              member.photo_url ? member.photo_url : '/public/avatar.png'
            }') center center / cover no-repeat`,
          }}
        />
        <div>
          <Link
            to={`/employees/${member.id}`}
            title={'Открыть личную карточку'}
            className={cn('name')}
          >
            {member.full_name}
          </Link>
          <p className={cn('post')}>{member.position}</p>
          <p className={cn('blog-practice')}>{member.department}</p>
        </div>
      </div>
    )
  }
}
