import React, { Component } from 'react'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import { CheckboxCircle, Arrow, Attention } from 'components-folder/Icon'
import {
  updateDoneTask,
  getTask
} from 'redux-folder/actions/taskActions'
import get from 'lodash/get'

const cn = require('bem-cn')('task-list-task')

moment.locale('ru')

const connector = connect(
  null,
  {
    getTask,
    updateDoneTask
  }
)

class TaskItem extends Component {

  get executorName() {
    const { task: { executor } } = this.props
    return `${executor.surname} ${executor.name} ${executor.middlename}`
  }

  get executionDate() {
    const { task } = this.props
    let left = this.daysLeft

    if ((left === 1 || left === 2 || left === 0) && moment() < moment(task.executed_at)) {
      return left === 2 ? 'Осталось 2 дня' : 'Остался 1 день'
    } else {
      return task.executed_at && moment(task.executed_at).format('DD.MM.YYYY, HH:mm').replace(', 00:00', '').replace(', 23:59', '')
    }
  }

  get daysLeft() {
    const { task } = this.props

    if (!task.executed_at) return NaN;

    const executed_at = moment(task.executed_at)
    const now = moment()
    return executed_at.diff(now, 'days')
  }

  get taskClass() {
    const { task, openCard, current, parent, status } = this.props

    let klass = cn.mix(((get(parent, 'id', false) || get(current, 'id', false)) === task.id) && openCard && 'task-list-task_active')
                  .state({ done: task.done })

    if (status === 'in_progress') {
      klass = klass.state({ done_animate: task.done })
      if (moment() > moment(task.executed_at)) {
        klass = klass({ 'the-deadline-is-today': true })
      } else if (this.daysLeft >= 0 && this.daysLeft <= 2 ) {
        klass = klass({ 'one-two-days-left': true })
      }
    }
    return klass
  }

  get priorityIconClass() {
    const { task: { priority } } = this.props

    return priority ? (priority === 1 ? 'icon-attention_reddish' : priority === 2 ? 'icon-attention_twilight' : 'icon-attention_green')
      : 'icon-attention_grey'
  }

  get entityName() {
    const { task: { taskable_type, taskable_id, taskable } } = this.props

    if (!taskable_type) {
      return null
    }

    const mapping = {
      'Project': 'Проект',
      'Survey': 'Опрос',
      'Bid': 'Заявка',
      'Vacancy': 'Вакансия',
      'Event': 'Событие',
      'Distribution': 'Команда'
    }

    const resourceName = mapping[taskable_type]

    const name = taskable && (taskable.name || taskable.title || taskable_id)
    return resourceName + ' ' + name
  }

  toggleDoneTask = () => {
    const { updateDoneTask, task } = this.props
    updateDoneTask(task, !task.done)
  }

  openTaskHandler = () => {
    const { getTask, task } = this.props
    getTask(task.id)
  }

  render() {
    const {
      task,
      openCard,
      openForm,
      inCurtain
    } = this.props

    return (
        <div
          className={this.taskClass}
          onClick={this.openTaskHandler}
        >
          <div
            className={cn('mark')}
            onClick={ (event) => {
              event.stopPropagation()
              this.toggleDoneTask()
            }}
            title={'Завершить задачу'}
          >
            {task.done ? (
              <CheckboxCircle status={inCurtain ? 'dark' : 'active'} className={cn('icon-checkbox')} />
            ) : (
              <CheckboxCircle status={inCurtain ? 'transparent' : null} className={cn('icon-checkbox')} />
            )}
          </div>

          <div className={cn('name')}>
            <p className={cn('text').mix(`p1 p1_theme_${inCurtain ? 'dark' : 'light'}_first indent_reset`)}>
              {task.title}
              {!inCurtain && this.entityName &&
                <small className={cn('entity-name')}>{this.entityName}</small>
              }
            </p>
          </div>

          { inCurtain ?
            <div className={cn('date-time')} key={task.id + 'date-time'}>
              <time dateTime={task.executed_at} className={cn('text').mix(`p1 p1_theme_dark_first indent_reset`)}>
                {this.executionDate}
              </time>
            </div> :

            !(openCard || openForm) && (
              [
                <div className={cn('date-time')} key={task.id + 'date-time'}>
                  <time dateTime={task.executed_at} className={cn('text').mix('p1 p1_theme_light_first indent_reset')}>
                    {this.executionDate}
                  </time>
                </div>,

                <div className={cn('performer')} key={task.id + 'performer'}>
                  <p className={cn('text').mix('p1 p1_theme_light_first indent_reset')}>{this.executorName}</p>
                </div>,

                <div className={cn('subtasks-count')} key={task.id + 'subtasks-count'}>
                  <p>
                    {`${task.executed_subtasks_count} / ${task.total_subtasks_count}`}
                  </p>
                </div>
              ]
            )
          }

          <div className={cn('priority')}>
            <div
              className={cn('attention').mix(
                cn(
                  task.priority ? (task.priority === 1
                    ? 'attention_reddish'
                    : task.priority === 2 ? 'attention_twilight' : 'attention_green') : 'attention_grey'
                )
              )}
            >
              {task.priority}
              <Attention
                className={cn('icon-attention').mix(
                  cn(this.priorityIconClass)
                )}
              />
            </div>
          </div>

          {/*<div className={cn('b-priority').mix(cn('b-priority_two'))}>*/}
            {/*<span className={'p2 p2_theme_dark_first'}>2</span>*/}
          {/*</div>*/}

          <span className={cn('arrow')}>
            <Arrow className={cn('icon-arrow')} />
          </span>
        </div>
    )
  }
}

export default connector(TaskItem)
