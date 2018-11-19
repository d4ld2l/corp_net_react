import React, { Component } from 'react'
import { v4 } from 'uuid'

const cn = require('bem-cn')('scale')

if (process.env.BROWSER) {
  require('./css/scale-profile.css')
}

export default class Scale extends Component {
  widthScale = (contact, resume, skills, project) => {
    switch (true) {
      case contact && resume && skills && project:
        return 'scale_active_100'
      case contact && resume && skills:
      case contact && resume && project:
      case contact && skills && project:
      case resume && skills && project:
        return 'scale_active_75'
      case contact && resume:
      case contact && skills:
      case contact && project:
      case resume && skills:
      case resume && project:
      case skills && project:
        return 'scale_active_50'
      case contact:
      case resume:
      case skills:
      case project:
        return 'scale_active_25'
      default:
        break
    }
  }
  render() {
    const { contact, resume, skills, project } = this.props

    return (
      <div
        className={cn.mix('scale-profile__scale')
        .mix(this.widthScale(contact, resume, skills, project))
        }
      >
        {[0, 1, 2].map(() => <div key={v4()} className={cn('limiter')} />)}
      </div>
    )
  }
}
