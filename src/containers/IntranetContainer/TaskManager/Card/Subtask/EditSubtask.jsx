import React, { Component } from 'react'
import moment from 'moment/moment'
import { Field, reduxForm } from 'redux-form'

import { Close, Calendar } from 'components-folder/Icon'

import BootstrapInput from 'components-folder/Form/BootstrapInput'
import SelectInput from 'components-folder/Form/SelectInput'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CheckboxField from 'components-folder/Form/CheckboxField'

const cn = require('bem-cn')('task-card')

if (process.env.BROWSER) {
  require('../../css/style.css')
}
moment.locale('ru')

const priority = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }]

class EditSubtask extends Component {
  componentDidUpdate() {
    const card_new = document.querySelector('.card__body_new')

    card_new && (card_new.clientHeight > 750 && card_new.classList.add('card__body_new_active').mix('global-scroll global-scroll_theme_light'))
  }

  render() {
    const { closeSidebar } = this.props

    return (
      <div className={cn.mix('tasks__card')}>
        <div className={cn('header').mix(cn('header_new'))}>
          <h2 className={cn('h2')}>
            Редактирование подзадачи
          </h2>
          <span className={cn('close')} title={'Закрыть карточку подзадачи'} onClick={closeSidebar}>
            <Close className={cn('close-icon')} />
          </span>
        </div>

        <div className={cn('body').mix(cn('body_new'))}>
          <Field component={BootstrapInput} name="name_subtask" type="text" label="Название подзадачи" />
          <Field component={BootstrapInput} name="performer_subtask" type="text" label="Исполнитель" />

          <div className={cn('datetime_new')}>
            <div className={cn('datetime')}>
              <div className={cn('date')}>
                <Field
                  name="starts_date"
                  component={DateTimeField}
                  dateFormat="DD.MM.YYYY"
                  timeFormat={false}
                  label={'Дата и время исполнения'}
                />
                <Calendar className={cn('calendar-icon_new')} />
              </div>
              <div className={cn('time')}>
                <Field
                  name="starts_time"
                  component={DateTimeField}
                  dateFormat={false}
                  timeFormat="hh:mm"
                  label={' '}
                />
              </div>
            </div>
          </div>
          <CheckboxField
            label="Отображать в календаре"
            name={`display_on_the_calendar`}
            className={cn('calendar-checkbox')}
          />

          <div className={cn('priority')}>
            <Field name="priority" label="Приоритет" component={SelectInput} options={priority} />
          </div>
          <button className={'btn btn-primary btn-margin-right'}>Сохранить</button>
          <button className={'btn btn-primary btn-outline'} onClick={closeSidebar}>
            Отменить
          </button>
        </div>
      </div>
    )
  }
}
export default reduxForm({
  form: 'EditSubtask',
})(EditSubtask)
