import React, { Component } from 'react'

import { Trash } from 'components-folder/Icon'
import { cn } from './index'

export default class DiscussionMembers extends Component {
  render() {
    const { member } = this.props
    return (
      <div className={cn('item')}>
        <div
          className={cn('avatar')}
          style={{
            background: `url('${
              member.photo_url ? member.photo_url : '/public/avatar.png'
            }') center center / cover no-repeat`,
          }}
        />
        <div className={cn('info')}>
          <div className={cn('name').mix('p1 p1_theme_light_first indent-reset')}>
            {member.full_name}
          </div>
          <div className={cn('position').mix('p2 p2_theme_light_second')}>{member.position}</div>
          <div className={cn('unit').mix('p2 p2_theme_light_second')}>{member.department}</div>
        </div>
      </div>
    )
  }
}
