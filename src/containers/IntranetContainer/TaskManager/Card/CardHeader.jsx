import React, { Component } from 'react'
import { deleteTask } from 'redux-folder/actions/taskActions'
import moment from 'moment/moment'

import { Close, Trash, Pencil, Alarm, Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('task-card')

if (process.env.BROWSER) {
  require('../css/style.css')
}
moment.locale('ru')

class CardHeader extends Component {

  destroyTask = () => {
    const { current, dispatch } = this.props
    dispatch(deleteTask(current))
  }

  closeCard = () => {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_OPEN_CARD_TASK', payload: false })
  }

  editTask = async () => {
    const { dispatch } = this.props
    await dispatch({ type: 'TOGGLE_OPEN_CARD_TASK', payload: false})
    dispatch({ type: 'TOGGLE_EDIT_TASK', payload: {
        edit: true,
        openForm: true,
        openCard: false,
      }
    })
  }

  closeSubTaskHandler = () => {
    const { dispatch, parent, openCard } = this.props
    if (openCard){
      dispatch({type: 'CLOSE_SUBTASK_CARD', payload: parent})
    }
  }

  render() {
    const { parent, inCurtain } = this.props

    return (
      <div className={cn('header')}>
        {parent && (
          <div
            className={cn('return-task')}
            title={'Вернуться назад в задачу'}
            onClick={this.closeSubTaskHandler}
          >
            <span className={cn('arrow')}>
              <Arrow className={cn('arrow-icon')} />
            </span>
            <p className={cn('text').mix(cn('text_return-task')).mix('p1 p1_theme_light_first')}>{parent.title}</p>
          </div>
        )}

        {!parent && inCurtain && (
          <div
            className={cn('return-task')}
            title={'Вернуться назад'}
            onClick={this.closeCard}
          >
            <span className={cn('arrow')}>
              <Arrow className={cn('arrow-icon')} />
            </span>
            <p className={cn('text').mix(cn('text_return-task')).mix('p1 p1_theme_light_first')}>
              Вернуться к списку
            </p>
          </div>
        )}

        <span className={cn('edit')} title={'Редактировать задачу'} onClick={this.editTask}>
          <Pencil className={cn('edit-icon').mix('icon')} />
        </span>
        <span className={cn('alarm')}>
          <Alarm className={cn('alarm-icon')} />
        </span>
        <span className={cn('remove')} title={'Удалить задачу'} onClick={this.destroyTask}>
          <Trash className={cn('remove-icon').mix('icon')} />
        </span>
        <span className={cn('close')} title={'Закрыть карточку задачи'} onClick={this.closeCard}>
          <Close className={cn('close-icon')} />
        </span>
      </div>
    )
  }
}

export default CardHeader
