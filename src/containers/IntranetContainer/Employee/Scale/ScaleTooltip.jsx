import React, { Component } from 'react'
import { v4 } from 'uuid'
import { Ok } from 'components-folder/Icon'

const cn = require('bem-cn')('tooltip')

if (process.env.BROWSER) {
  require('./css/scale-profile.css')
}

export default class ScaleTooltip extends Component {
  render() {
    const {
      phone,
      email,
      other_ways,
      social,
      contact,
      work,
      education,
      language,
      resume,
      skills,
      role,
      duties,
      project,
    } = this.props

    return (
      <div className={cn.mix('scale-profile__tooltip')}>
        <h5>Заполненные шаги</h5>
        <ul className={cn('list')}>
          <li className={cn('item')}>
            <Ok
              className={cn('reminder')
                .mix(cn('reminder_big'))
                .mix(contact && cn('reminder_completed'))}
            />
            <p className={cn('header').mix('p1 p1_theme_light_first indent_reset')}>Контакты:</p>
          </li>
          <ul className={cn('list').mix(cn('list_inner'))}>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(phone && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(contact && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>телефон</p>
            </li>
            <li className={'tooltip__item'}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(email && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(contact && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>email</p>
            </li>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(other_ways && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(contact && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>
                другие способы связи
              </p>
            </li>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(social && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(contact && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>соц. сети</p>
            </li>
          </ul>
        </ul>
        <ul className={cn('list')}>
          <li className={cn('item')}>
            <Ok
              className={cn('reminder')
                .mix(cn('reminder_big'))
                .mix(resume && cn('reminder_completed'))}
            />
            <p className={cn('header').mix('p1 p1_theme_light_first indent_reset')}>Резюме:</p>
          </li>
          <ul className={cn('list').mix(cn('list_inner'))}>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(work && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(resume && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>место работы</p>
            </li>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(education && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(resume && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>образование</p>
            </li>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(language && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(resume && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>знание языков</p>
            </li>
          </ul>
        </ul>
        <ul className={cn('list')}>
          <li className={cn('item')}>
            <Ok
              className={cn('reminder')
                .mix(cn('reminder_big'))
                .mix(skills && cn('reminder_completed'))}
            />
            <p className={cn('header').mix('p1 p1_theme_light_first indent_reset')}>Навыки</p>
          </li>
        </ul>
        <ul className={cn('list')}>
          <li className={cn('item')}>
            <Ok
              className={cn('reminder')
                .mix(cn('reminder_big'))
                .mix(project && cn('reminder_completed'))}
            />
            <p className={cn('header').mix('p1 p1_theme_light_first indent_reset')}>Проекты:</p>
          </li>
          <ul className={cn('list').mix(cn('list_inner'))}>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(role && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(project && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>роль</p>
            </li>
            <li className={cn('item')}>
              <Ok
                className={cn('reminder')
                  .mix(cn('reminder_small'))
                  .mix(duties && cn('reminder_completed'))}
              />
              <p className={cn('text').mix(project && cn('text_completed')).mix('p2 p2_theme_light_first indent_reset')}>обязанности</p>
            </li>
          </ul>
        </ul>
      </div>
    )
  }
}
