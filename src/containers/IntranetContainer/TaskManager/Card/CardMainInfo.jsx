import React, { Component } from 'react'
import moment from 'moment/moment'

import { CheckboxCircle, Flag, Calendar } from 'components-folder/Icon'

import { updateDoneTask, updateDoneSubTask } from 'redux-folder/actions/taskActions'

const cn = require('bem-cn')('task-card')

if (process.env.BROWSER) {
  require('../css/style.css')
}
moment.locale('ru')

export default class CardMainInfo extends Component {
  get authorName() {
    const { current: { author } } = this.props
    return `${author.surname} ${author.name} ${author.middlename}`
  }

  get createdAt() {
    const { current } = this.props
    return (
      current.created_at &&
      moment(current.created_at)
        .format('DD.MM.YYYY, HH:mm')
        .replace(', 00:00', '')
        .replace(', 23:59', '')
    )
  }

  get executionDate() {
    const { current } = this.props
    return (
      current.executed_at &&
      moment(current.executed_at)
        .format('DD.MM.YYYY, HH:mm')
        .replace(', 00:00', '')
        .replace(', 23:59', '')
    )
  }

  toggleDoneTask = () => {
    const { dispatch, current, parent } = this.props
    if (parent) {
      dispatch(updateDoneSubTask(parent, current))
    } else {
      dispatch(updateDoneTask(current, !current.done))
    }
  }

  get daysLeft() {
    const { current } = this.props

    if (!current.executed_at) return NaN;

    const executed_at = moment(current.executed_at)
    const now = moment()
    return executed_at.diff(now, 'days')
  }

  get taskClass() {
    const { current, status } = this.props

    let klass = cn('main-info').state({ done: current.done })

    if (status === 'in_progress') {
      klass = klass.state({ done_animate: current.done })
      if (moment() > moment(current.executed_at)) {
        klass = klass.mix('task_the-deadline-is-today')
      } else if (this.daysLeft >= 0 && this.daysLeft <= 2) {
        klass = klass.mix('task_one-two-days-left')
      }
    }
    return klass
  }

  render() {
    const { current, inCurtain } = this.props

    return (
      <div className={this.taskClass}>
        <div className={cn('mark')} onClick={() => this.toggleDoneTask()}>
          {current.done ? (
            <CheckboxCircle status={inCurtain ? 'dark' : 'active'} className={'task__icon-checkbox'} />
          ) : (
            <CheckboxCircle status={inCurtain ? 'transparent' : null} className={'task__icon-checkbox'} />
          )}
        </div>

        <div>
          <h2 className={cn('name')}>{current.title}</h2>
          <div>
            <span className={cn('author').mix('p3 p3_theme_light')}>
              Автор —{' '}
              {
                <a
                  className={'p3 link_theme_light_second'}
                  href={`/employees/${current.author.id}`}
                >
                  {' '}
                  {this.authorName}{' '}
                </a>
              }
            </span>
            <span className={cn('date-create').mix('p3 p3_theme_light')}>
              Дата создания — {this.createdAt}
            </span>
          </div>
          <div className={cn('info').mix('info')}>
            <div className={'info__item'}>
              <span className={cn('icon-wrapper').mix(cn('icon-wrapper_reddish'))}>
                <Calendar outline className={cn('calendar-icon')} />
              </span>
              <div>
                <p className={'info__label p3 p3_theme_light'}>Срок исполнения</p>
                <time dateTime={current.date} className={`info__text p1 p1_theme_${inCurtain ? 'dark' : 'light'}_first`}>
                  {this.executionDate}
                </time>
              </div>
            </div>
            <div className={'info__item'}>
              <span
                className={cn('icon-wrapper').mix(
                  cn(`priority-${current.priority}`)
                )}
              >
                <Flag className={cn('flag-icon')} />
              </span>
              <div>
                <p className={'info__label p3 p3_theme_light'}>Приоритет</p>
                <p className={`info__text p1 p1_theme_${inCurtain ? 'dark' : 'light'}_first`}>{current.priority}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
