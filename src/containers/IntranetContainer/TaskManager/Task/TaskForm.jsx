import React, { Component } from 'react'
import moment from 'moment/moment'
import { Field, reduxForm } from 'redux-form'

import SubtaskWrapper from '../Card/Subtask/SubtaskWrapper'

import { Close, Calendar } from 'components-folder/Icon'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import SelectInput from 'components-folder/Form/SelectInput'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CheckboxField from 'components-folder/Form/CheckboxField'
import EmployeeSelect from '../EmployeeSelect'
import Observers from '../Card/Observers'

import compose from 'ramda/src/compose'
import { createTask, updateTask } from 'redux-folder/actions/taskActions'
import { required } from 'lib-folder/validation'
import Loader from "components-folder/Loader";


const cn = require('bem-cn')('task-card')

if (process.env.BROWSER) {
  require('../css/style.css')
}
moment.locale('ru')

const priorities = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }]

const connector = compose(
  reduxForm({ form: 'Task' })
)

class TaskForm extends Component {

  async componentDidMount() {
    const { initialize, current, edit, user } = this.props
    const { title, author, executor, executed_at, ends_at, displayed_in_calendar, priority, description, task_observers } = current

    if (edit){
      initialize({
        id: current.id,
        task_id: current.parent_id,
        title,
        author: author && {
          label: `${author.surname} ${author.name} ${author.middlename}`,
          value: author.id,
          avatar: author.photo.thumb.url
        },
        executor: executor && {
          label: `${executor.surname} ${executor.name} ${executor.middlename}`,
          value: executor.id,
          avatar: executor.photo.thumb.url
        },
        executed_at_date: executed_at && moment(executed_at),
        executed_at_time: executed_at && moment(executed_at),
        ends_at_date: ends_at && moment(ends_at),
        ends_at_time: ends_at && moment(ends_at),
        displayed_in_calendar,
        priority,
        description,
        subtasks: current.parent_id ? null : (current.subtasks || []).concat({ task_id: current.id }),
        observers: task_observers ? task_observers.map((o) => ({
          id: o.id,
          label: `${o.account.surname} ${o.account.name}`,
          value: o.account_id,
          account_id: o.account_id,
          avatar: o.account.photo.url,
          task_id: o.task_id,
        })) : []
      })
    } else {
      initialize({
        executor: user && {
          label: `${user.surname} ${user.name} ${user.middlename}`,
          value: user.id,
          avatar: user.photo.thumb.url
        },
        subtasks: [{}],
        observers: []
      })
    }
  }

  onSubmit = async () => {
    const { dispatch, edit, current } = this.props
    if (!edit){
      dispatch(createTask())
    } else {
      dispatch(updateTask(current))
    }
  }

  close = () => {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_OPEN_FORM_TASK', payload: {
        openForm: false,
        edit: false,
      }
    })
  }


  render() {
    const { view, current, handleSubmit, markDone, dispatch, edit, taskFormLoading } = this.props

    return (
      <div className={cn.mix('tasks__card')}>
        <div className={cn('header').mix(cn('header_new'))}>
          <h2 className={cn('h2')}>
            {edit ? `Редактирование ${current.parent_id ? 'подзадачи' : 'задачи'}` : 'Новая задача'}
          </h2>
          <span className={cn('close')} title={'Закрыть карточку задачи'} onClick={this.close}>
            <Close className={cn('close-icon')} />
          </span>
        </div>

        <div className={cn('body').mix(cn('body_new'))}>
          {
            taskFormLoading && (
              <div className={cn('loader_form')}>
                <Loader/>
              </div>
            )
          }
          <form
            onSubmit={handleSubmit(this.onSubmit)}
            onKeyPress={e => {
              if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && !(e.target.name === 'title' && e.target.value)) {
                e.preventDefault()
              }
            }}
          >
            <div className="required">
              <Field
                component={BootstrapInput}
                name="title"
                type="text"
                label="Название задачи"
                maxLength="50"
                validate={required}
                autoFocus={true}
                autoComplete="off"
              />
            </div>

            { edit &&
              <div className="required">
                <EmployeeSelect key="author" name="author" label="Автор" validate={required} />
              </div>
            }

            <div className={!current.parent_id && "required"}>
              {/*<Field component={BootstrapInput} name="executor_id" type="text" label="Исполнитель" validate={required} className="required" />*/}
              <EmployeeSelect key="executor" name="executor" label="Исполнитель" validate={current.parent_id ? undefined : required} />
            </div>

            <div className={cn('datetime_new')}>
              <div className={cn('datetime')}>
                <div className={cn('date')}>
                  <Field
                    name="executed_at_date"
                    component={DateTimeField}
                    dateFormat="DD.MM.YYYY"
                    timeFormat={false}
                    label={'Срок исполнения'}
                  />
                  <Calendar className={cn('calendar-icon_new')} />
                </div>

                <div className={cn('time')}>
                  <Field
                    name="executed_at_time"
                    component={DateTimeField}
                    dateFormat={false}
                    timeFormat="HH:mm"
                    label={' '}
                  />
                </div>
              </div>

              {/*{!current.parent_id && (*/}
                {/*<div className={cn('datetime')}>*/}
                  {/*<div className={cn('date')}>*/}
                    {/*<Field*/}
                      {/*name="ends_at_date"*/}
                      {/*component={DateTimeField}*/}
                      {/*dateFormat="DD.MM.YYYY"*/}
                      {/*timeFormat={false}*/}
                      {/*label={'Срок завершения'}*/}
                    {/*/>*/}
                    {/*<Calendar className={cn('calendar-icon_new')} />*/}
                  {/*</div>*/}
                  {/*<div className={cn('time').mix(cn('time_position'))}>*/}
                    {/*<Field*/}
                      {/*name="ends_at_time"*/}
                      {/*component={DateTimeField}*/}
                      {/*dateFormat={false}*/}
                      {/*timeFormat="HH:mm"*/}
                      {/*label={' '}*/}
                    {/*/>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*)}*/}
            </div>

            <CheckboxField
              label="Отображать в календаре"
              name={`displayed_in_calendar`}
              className={cn('calendar-checkbox')}
            />

            <div className={cn('priority')}>
              <Field
                name="priority"
                label="Приоритет"
                component={SelectInput}
                options={priorities}
                simpleValue={true}
              />
            </div>

            <div>
              <Field component={BootstrapTextarea} name="description" label="Описание" />
              <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>Вы можете указать особенность задачи</p>
            </div>

            { !current.parent_id && (
              <div className={cn('subtask_new')}>
                <SubtaskWrapper
                  task={current}
                  view={view}
                  markDone={markDone}
                  dispatch={dispatch}
                  {...this.props}
                />
              </div>
            )}

            { !current.parent_id && (
              <Observers task={current} {...this.props} wrapperClass={cn('body_new_observers')} />
            )}

            <button className={'btn btn-primary btn-margin-right'}>
              Сохранить
            </button>

            <span className={'btn btn-primary btn-outline'} onClick={() => this.close()}>
              Отменить
            </span>
          </form>
        </div>
      </div>
    )
  }
}
export default connector(TaskForm)
