import React, { PureComponent } from 'react'
import { Field, FieldArray } from 'redux-form'

import {
  Close,
} from 'components-folder/Icon/'

import BootstrapInput from "components-folder/Form/BootstrapInput"
import SelectInputGroupSite from "components-folder/Form/SelectInputGroupSite"
import BootstrapTextarea from "components-folder/Form/BootstrapTextarea"
import FieldPhone from './FieldPhone'
import FieldEmail from './FieldEmail'
import FieldOther from './FieldOther'
import { required } from '../../../../lib/validation'

const cn = require('bem-cn')('customers')


const MESSENGER_OPTIONS = [
  {
    label: 'Telegram',
    value: 'Telegram',
  },
  {
    label: 'ICQ',
    value: 'ICQ',
  },
  {
    label: 'Hangout',
    value: 'Hangout',
  },
  {
    label: 'Threema',
    value: 'Threema',
  },
  {
    label: 'Signal',
    value: 'Signal',
  },
  {
    label: 'Google Allo',
    value: 'Google Allo',
  },
]

class ContactForm extends PureComponent {

  render() {
    const { closeSidebar, show, dispatch, onSubmit } = this.props

    return (
      <div className={cn('customer-card-wrapper').mix(cn('customer-card-wrapper_new'))}>
        <div className={cn('customer-card-head-wrapper')}>
          <h2>
            {show === 'edit' ? 'Редактирование контактного лица' : 'Новое контактное лицо'}
          </h2>
          <div
            className={cn('customer-card-func-elements').mix(cn('customer-card-func-elements_new'))}
          >
            <span
              onClick={closeSidebar}
              className={cn('customer-card-closed-thin-icon-wrapper').mix('cur')}
              title="Закрыть"
            >
              <Close className={cn('customer-card-closed-thin-icon')} />
            </span>
          </div>
        </div>

        <div className={cn('b-wrapper').mix(cn('b-wrapper_padding')).mix('global-scroll global-scroll_theme_light')}>
          <div className="required">
            <Field
              component={BootstrapInput}
              name="name"
              type="text"
              label="Контактное лицо"
              validate={required}
            />
          </div>
          <div className="required">
            <Field
              component={BootstrapInput}
              name="position"
              type="text"
              label="Должность"
              validate={required}
            />
          </div>

          <Field component={BootstrapInput} name="city" type="text" label="Город" />

          <Field
            component={BootstrapTextarea}
            name="description"
            type="text"
            label="Описание"
          />
          <div className={cn('line-horizontal').mix(cn('line-horizontal_mt30'))} />

          <h4>Телефон</h4>
          <FieldArray name="phones" component={FieldPhone} dispatch={dispatch} />

          <div className={cn('line-horizontal')} />

          <h4>Email</h4>
          <FieldArray name="emails" component={FieldEmail} dispatch={dispatch} />

          <div className={cn('line-horizontal')} />

          <h4>Другие способы связи</h4>
          <FieldArray name="messengers" options={MESSENGER_OPTIONS} component={FieldOther} dispatch={dispatch} />

          <div className={cn('wrapper-input-skype')}>
            <Field component={BootstrapInput} name="skype" type="text" label="Skype" />
          </div>

          <div className={cn('line-horizontal').mix(cn('line-horizontal_mt30'))} />

          <div className={cn('wrapper-input-skype')}>
            <h4>Социальные сети</h4>
            <FieldArray
              name="social_urls"
              component={SelectInputGroupSite}
              label="Соц. сеть"
              dispatch={dispatch}
            />
          </div>

          <div>
            <button className={'btn btn-primary btn-margin-right '} onClick={onSubmit}>Сохранить</button>
            <button className={'btn btn-primary btn-outline'} onClick={closeSidebar}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactForm
