import React, { Component } from 'react'
import moment from 'moment/moment'

const cn = require('bem-cn')('task-card')

if (process.env.BROWSER) {
  require('../css/style.css')
}
import get from 'lodash/get'
moment.locale('ru')

export default class CardBody extends Component {
  get executorName() {
    const { current: { executor } } = this.props
    return executor && `${executor.surname} ${executor.name} ${executor.middlename}`
  }

  get executorPhotoUrl() {
    const { current: { executor } } = this.props
    return executor && executor.photo.thumb.url
  }

  get executorLink() {
    const { current: { executor }, inCurtain } = this.props

    return executor && (
      <a
        href={`/employees/${executor.id}`}
        className={`performer__name link link_theme_${inCurtain ? 'dark' : 'light'}_first`}
      >
        {' '}
        {executor.full_name}{' '}
      </a>
    )
  }

  render() {
    const { current, inCurtain } = this.props

    return (
      <div className={cn('body')}>
        <div className={cn('item')}>
          <p className={cn('label').mix('p3 p3_theme_light')}>Описание</p>
          <p className={cn('text').mix(`p1 p1_theme_${inCurtain ? 'dark' : 'light'}_first`)}>{current.description}</p>
        </div>

        <div className={cn('item')}>
          <p className={cn('label').mix('p3 p3_theme_light')}>исполнитель</p>

          <div className={cn('performer').mix('performer')}>
            <div
              className="performer__photo"
              style={{
                background: `url(${this.executorPhotoUrl}) center center / cover no-repeat`,
              }}
            />
            <div>
              <p className="performer__name indent_reset">
                {
                  this.executorLink
                }
              </p>
              <p className="performer__post p2 p2_theme_light_second indent_reset">
                {get(current, 'executor.position_name', '')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
