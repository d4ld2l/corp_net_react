import React, { Component } from 'react'
import moment from 'moment/moment'
import { reduxForm, FieldArray } from 'redux-form'
import { Field, change } from 'redux-form'
import SelectInput from 'components-folder/Form/SelectInput'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import EmployeeSelect from '../../EmployeeSelect'
import { Plus, Calendar, Avatar, Flag } from 'components-folder/Icon'
import { required } from 'lib-folder/validation'
import {connect} from "react-redux"
import compose from "ramda/src/compose"
import { createTask, updateTask } from 'redux-folder/actions/taskActions'
import ClickOutside from 'components-folder/ClickOutside'

const cn = require('bem-cn')('add-subtask')

if (process.env.BROWSER) {
  require('../../css/style.css')
}
moment.locale('ru')

const priorities = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }]


class SubtaskFields extends Component {
  // componentDidMount() {
  //   const { fields, current } = this.props
  //   fields.push({ task_id: current.id })
  // }


  finalizeSubtask(index) {
    const { fields, setView, addSubtask, reset } = this.props
    const values = fields.get(index)
    const { title } = values

    if (title) {
      setView({ field: null })
      addSubtask({ ...values, index }, () => { reset(); fields.push({}) })
      fields.push({})
    }
  }

  onClickOutsideControls = (event) => {
    !event.target.closest('.add-subtask__controls') && this.props.setView()
  }

  render() {
    const { currentField, setView, fields } = this.props

    return (
      <div>
        {fields.map((field, index) => (
          index + 1 === fields.length && ( // show only last field
            <div className={cn.mix('card__add-subtask')} key={index}>
            <span
              title={'Добавить сабтаск'}
              onClick={() => { this.finalizeSubtask(index) }}
            >
              <Plus outline={'filled'} className={cn('add-btn').mix(fields.get(index).title && cn('add-btn_active'))} />
            </span>


              <Field
                type="text"
                component="input"
                className={cn('input')}
                name={`${field}.title`}
                maxLength="50"
                placeholder="Введите название подзадачи"
                onKeyPress={(e) => { e.key === 'Enter' && this.finalizeSubtask(index) }}
                // validate={() => true}
              />

              <div className={cn('controls')}>
                <span
                  title={
                    currentField === 'calendar' ? 'Закрыть дату и время исполнения' : 'Выбрать дату и время исполнения'
                  }
                  onClick={() => setView({ field: 'calendar' })}
                >
                  <Calendar
                    className={cn('calendar-icon').mix(currentField === 'calendar' && cn('calendar-icon_active'))}
                  />
                </span>

                <span
                  title={currentField === 'executor' ? 'Закрыть форму - исполнитель' : 'Выбрать исполнителя'}
                  onClick={() => setView({ field: 'executor' })}
                >
                  <Avatar size={30} className={cn('user-icon').mix(currentField === 'executor' && cn('user-icon_active'))} />
                </span>

                <span
                  title={currentField === 'priority' ? 'Закрыть форму - приоритет' : 'Выбрать приоритет'}
                  onClick={() => setView({ field: 'priority' })}
                >
                  <Flag className={cn('flag-icon').mix(currentField === 'priority' && cn('flag-icon_active'))} />
                </span>
              </div>

              {currentField === 'calendar' && (
                <ClickOutside onClick={this.onClickOutsideControls}>
                  <div className={cn('calendar')}>
                    <Field
                      component={DateTimeField}
                      name={`${field}.executed_at`}
                      label={'Срок исполнения'}
                      dateFormat="MM.DD.YYYY"
                      timeFormat="HH:mm"
                      closeOnSelect={false}
                      showInput={false}
                    />
                  </div>
                </ClickOutside>
              )}

              {currentField === 'executor' && (
                <ClickOutside onClick={this.onClickOutsideControls}>
                  <div className={cn('performer')}>
                    <EmployeeSelect
                      name={`${field}.executor`}
                      label="Исполнитель"
                      // validate={required}
                    />
                  </div>
                </ClickOutside>
              )}

              {currentField === 'priority' && (
                <ClickOutside onClick={this.onClickOutsideControls}>
                  <div className={cn('priority')}>
                    <Field
                      component={SelectInput}
                      options={priorities}
                      // valueRenderer={this.renderSelectValue}
                      // optionRenderer={this.renderSelectOption}
                      searchable={false}
                      creatable={false}
                      name={`${field}.priority`}
                      multi={false}
                      label="ПРИОРИТЕТ"
                      simpleValue={true}
                    />
                  </div>
                </ClickOutside>
              )}
            </div>
          )
        ))}
      </div>
    )
  }

}

const connector = compose(
  connect(
    null,
    dispatch => ({
      createTask: () => dispatch(createTask()),
      updateTask: (id) => dispatch(updateTask(id))
    })
  ),
  reduxForm({
    form: 'Task'
  })
)

class NewSubtaskForm extends Component {
  state = {
    field: null, // 'calendar', 'executor', 'priority'
  }

  componentDidMount() {
    const { submitOnChange } = this.props
    submitOnChange && this.changeForm()
  }

  componentDidUpdate(prevProps) {
    if (this.props.task.id !== prevProps.task.id || this.props.view !== prevProps.view) {
      this.props.submitOnChange && this.changeForm()
    }
  }

  changeForm() {
    const { task, dispatch } = this.props
    dispatch(change('Task', 'subtasks', task.parent_id ? null : (task.subtasks || []).concat({ task_id: task.id })))
  }

  setView = ({ field } = {}) => {
    this.setState({
      field: field === this.state.field ? null : field // toggle
    })
  }

  // onSubmit = async () => {
  //   const { task, showTaskCard, updateTask, createTask } = this.props
  //   const data = task.id ? await updateTask(task.id) : await createTask()
  //   showTaskCard(data)
  // }

  render() {
    const { show, field } = this.state
    const { handleSubmit } = this.props

    return (
      <FieldArray
        name="subtasks"
        component={SubtaskFields}
        // show={show}
        currentField={field}
        setView={this.setView}
        // onSubmit={handleSubmit(this.onSubmit)}
        {...this.props}
      />
    )
  }
}

export default connector(NewSubtaskForm)
