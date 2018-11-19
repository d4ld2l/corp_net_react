
import React, { Component } from 'react'

import { GROUPS_HEADER, GROUPS_ITEM_DATA } from './data'

import moment from 'moment/moment'
import { v4 } from 'uuid'

const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('./css/groups/groups.css')
}
moment.locale('ru')

export default class GroupsHeader extends Component{
  constructor(props) {
    super(props)

    this.state = {
      header: GROUPS_HEADER,
    }
  }

  render() {
    const { header  } = this.state
    const { show } = this.props

    return (
      <div>
        <div className={cn('heading').mix('p3 p3_theme_light').mix(show && 'groups__heading_active')}>
          {header.map(it => (
            <div key={v4()} className={cn('heading-item')}>
              {it.name}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
