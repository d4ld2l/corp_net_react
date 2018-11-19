import React, { Component } from 'react'
import { change, formValueSelector } from 'redux-form'
import moment from 'moment/moment'

import { Plus } from 'components-folder/Icon'
import EmployeeSelect from '../EmployeeSelect'
import { updateTask } from 'redux-folder/actions/taskActions'

import {connect} from "react-redux"

const cn = require('bem-cn')('observers')

if (process.env.BROWSER) {
  require('../css/style.css')
}

moment.locale('ru')

const selector = formValueSelector('Task')

const connector = connect(
  state => ({
    o: selector(state, 'observers')
  }),
  dispatch => ({
    updateTask: (id, ...args) => dispatch(updateTask(id, ...args))
  })
)

class Observers extends Component {
  state = {
    showSelect: false
  }

  componentDidMount() {
    const { submitOnChange } = this.props
    submitOnChange && this.changeForm()
  }

  componentDidUpdate(prevProps) {
    if (this.props.current.id !== prevProps.current.id) {
      this.setState({ showSelect: false })
      this.props.submitOnChange && this.changeForm()
    }
  }

  changeForm() {
    const { dispatch, current: { task_observers } } = this.props

    const observers = task_observers.map((o) => ({
      id: o.id,
      label: `${o.account.surname} ${o.account.name}`,
      value: o.account_id,
      account_id: o.account_id,
      avatar: o.account.photo.url,
      task_id: o.task_id
    }))

    dispatch(change('Task', 'observers', observers))
  }


  render() {
    const { current, showTaskCard, current: { task_observers }, edit, openCard, view, wrapperClass, updateTask, openForm, form } = this.props
    const { showSelect } = this.state
    return (
      <div className={wrapperClass}>
        <p className={'card__label p3 p3_theme_light'}>Наблюдатели</p>
        <div className={cn}>
        <span title={'Добавить наблюдателя'} onClick={() => { this.setState({ showSelect: !showSelect }) }}>
          <Plus outline={'filled'}
            className={cn('add-btn')}
          />
        </span>
          <div>
            { (openCard || edit) && task_observers && task_observers.map((observer) => (
              <div
                key={observer.id}
                className={cn('photo')}
                style={{
                  background: `url(${observer.account.photo.url}) center center / cover no-repeat`,
                }}
                title={observer.account.full_name}
              />
            ))}
          </div>
        </div>

        {showSelect && (
          <div className={cn('select')}>
            <EmployeeSelect
              name="observers"
              label="Добавить наблюдателя"
              multi={true}
              submitOnChange={view === 'show'}
              task={current}
              showTaskCard={showTaskCard}
              updateTask={updateTask}
              {...this.props}
            />
          </div>
        )}
      </div>
    )
  }
}

export default connector(Observers)
