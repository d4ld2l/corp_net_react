import React, { Component } from 'react'
import moment from 'moment/moment'

import { CheckboxCircle, Arrow, Attention } from 'components-folder/Icon'

const cn = require('bem-cn')('task')

if (process.env.BROWSER) {
  require('./css/style.css')
}
moment.locale('ru')

export default class Subtask extends Component {
  render() {
    const {
      subtask,
      show,
      showNewTaskCard,
      showEditTaskCard,
      taskId,
      task,
      onClick,
      onMark,
      isMark,
      showSubtask
    } = this.props

    return (
        <div
          className={cn.mix('task_subtask')
            .mix(taskId === task && show && 'subtask_active')
            .state({ done: taskId === task && isMark === true })}
          onClick={() => onClick({ taskId: task, show: true, showSubtask: true })}
        >
          <div
            className={cn('mark')}
            onClick={event => {
              event.stopPropagation()
              onMark({ taskId: task, isMark: !isMark })
            }}
            title={'Завершить задачу'}
          >
            {taskId === task && isMark ? (
              <CheckboxCircle status={'active'} className={cn('icon-checkbox')} />
            ) : (
              <CheckboxCircle className={cn('icon-checkbox')} />
            )}
          </div>
          <div className={cn('name')}>
            <p className={cn('text')}>{subtask.name}</p>
          </div>
          {show === undefined || (show === true && showNewTaskCard === false)
            ? !show && (
            <div className={cn('date-time')}>
              <time dateTime={subtask.date} className={cn('text')}>
                {subtask.date}
              </time>
            </div>
          )
            : show === false && showNewTaskCard === false && showEditTaskCard === false
              ? !show && (
              <div className={cn('date-time')}>
                <time dateTime={subtask.date} className={cn('text')}>
                  {subtask.date}
                </time>
              </div>
            )
              : show === false && showNewTaskCard === false && showEditTaskCard === undefined
                ? !show && (
                <div className={cn('date-time')}>
                  <time dateTime={subtask.date} className={cn('text')}>
                    {subtask.date}
                  </time>
                </div>
              )
                : show && (
                <div className={cn('date-time')}>
                  <time dateTime={subtask.date} className={cn('text')}>
                    {subtask.date}
                  </time>
                </div>
              )}

          {show === undefined || (show === true && showNewTaskCard === false)
            ? !show && (
            <div className={cn('performer')}>
              <p className={cn('text')}>{subtask.performer}</p>
            </div>
          )
            : show === false && showNewTaskCard === false && showEditTaskCard === false
              ? !show && (
              <div className={cn('performer')}>
                <p className={cn('text')}>{subtask.performer}</p>
              </div>
            )
              : show === false && showNewTaskCard === false && showEditTaskCard === undefined
                ? !show && (
                <div className={cn('performer')}>
                  <p className={cn('text')}>{subtask.performer}</p>
                </div>
              )
                : show && (
                <div className={cn('performer')}>
                  <p className={cn('text')}>{subtask.performer}</p>
                </div>
              )}
          <div className={cn('priority')}>
            <div
              className={cn('attention').mix(
                cn(
                  subtask.priority === 1
                    ? 'attention_reddish'
                    : subtask.priority === 2 ? 'attention_twilight' : 'attention_green'
                )
              )}
            >
              {subtask.priority}
              <Attention
                className={cn('icon-attention').mix(
                  cn(
                    subtask.priority === 1
                      ? 'icon-attention_reddish'
                      : subtask.priority === 2 ? 'icon-attention_twilight' : 'icon-attention_green'
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
