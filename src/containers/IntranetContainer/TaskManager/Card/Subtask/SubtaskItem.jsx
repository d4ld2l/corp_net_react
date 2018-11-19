import React, { Component } from 'react'
import moment from 'moment/moment'
import { change } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import {
  CheckboxCircle,
  Arrow,
  Attention,
} from 'components-folder/Icon'

import { updateDoneSubTask } from 'redux-folder/actions/taskActions'
const cn = require('bem-cn')('subtask')

if (process.env.BROWSER) {
  require('../../css/style.css')
}
moment.locale('ru')

export default class SubtaskItem extends Component {
  get executorName() {
    const { subtask: { executor } } = this.props
    return executor && (executor.label || `${executor.surname} ${executor.name} ${executor.middlename}`)
  }

  get executorPhotoUrl() {
    const { subtask: { executor } } = this.props
    return executor && (executor.avatar || executor.photo.thumb.url)
  }

  get executionDate() {
    const { subtask } = this.props
    return (
      subtask.executed_at &&
      moment(subtask.executed_at)
        .format('DD.MM.YYYY, HH:mm')
        .replace(', 00:00', '')
        .replace(', 23:59', '')
    )
  }

  toggleDoneSubTask = () => {
    const { dispatch, current, subtask, openForm, edit, toggleDone } = this.props
    if (openForm && !edit) {
      toastr.error('Чтобы завершить подзадачу, сохраните задачу.')
    } else {
      dispatch(updateDoneSubTask(current, subtask))
      if (openForm && edit) {
        toggleDone()
      }
    }
  }

  openSubTaskHandler = () => {
    const { dispatch, current, subtask, openCard } = this.props
    if (openCard) {
      dispatch({ type: 'OPEN_SUBTASK_CARD', payload: { current, subtask } })
    } else {
      toastr.error('Просмотр из формы недоступен.')
    }
  }

  get daysLeft() {
    const { subtask } = this.props

    if (!subtask.executed_at) return NaN;

    const executed_at = moment(subtask.executed_at)
    const now = moment()
    return executed_at.diff(now, 'days')
  }

  get taskClass() {
    const { subtask } = this.props

    let klass = cn.state({ done: subtask.done })

    if (moment() > moment(subtask.executed_at) && !subtask.done) {
      klass = klass.mix('task-list-task_the-deadline-is-today')
    } else if (this.daysLeft >= 0 && this.daysLeft <= 2 && !subtask.done) {
      klass = klass.mix('task-list-task_one-two-days-left')
    }
    return klass
  }

  render() {
    const { subtask, inCurtain } = this.props

    return (
      <div className={this.taskClass()} onClick={this.openSubTaskHandler}>
        <div
          className={cn('mark')}
          onClick={event => {
            event.stopPropagation()
            this.toggleDoneSubTask()
          }}
          title={'Завершить подзадачу'}
        >
          {subtask.done ? (
            <CheckboxCircle status={inCurtain ? 'dark' : 'active'} className={cn('icon-checkbox')} />
          ) : (
            <CheckboxCircle status={inCurtain ? 'transparent' : null} className={cn('icon-checkbox')} />
          )}
        </div>

        <div className={cn('name')} title={subtask.title}>
          <p className={cn('text').mix('p1 p1_theme_light_first indent_reset')}>{subtask.title}</p>
        </div>
        <div className={cn('date-time')}>
          <time dateTime={this.executionDate} className={cn('text')}>
            {this.executionDate}
          </time>
        </div>
        <div className={cn('performer')} title={this.executorName}>
          <div
            className={'performer__photo'}
            style={{ background: `url(${this.executorPhotoUrl}) center center / cover no-repeat` }}
          />
        </div>
        <div className={cn('priority')}>
          <div
            className={cn('attention').mix(
              cn(
                subtask.priority
                  ? subtask.priority === 1
                    ? 'attention_reddish'
                    : subtask.priority === 2 ? 'attention_twilight' : 'attention_green'
                  : 'attention_grey'
              )
            )}
          >
            {subtask.priority}
            <Attention
              className={cn('icon-attention').mix(
                cn(
                  subtask.priority
                    ? subtask.priority === 1
                      ? 'icon-attention_reddish'
                      : subtask.priority === 2 ? 'icon-attention_twilight' : 'icon-attention_green'
                    : 'icon-attention_grey'
                )
              )}
            />
          </div>
        </div>
        <span className={cn('arrow')}>
          <Arrow className={cn('icon-arrow')} />
        </span>
      </div>
    )
  }
}
