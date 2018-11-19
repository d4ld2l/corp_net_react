import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, change } from 'redux-form'
import { Link } from 'react-router-dom'
import { compose, pick } from 'ramda'
import { Row, Col, Collapse } from 'react-bootstrap'
import moment from 'moment'
import { phoneFormat, emailFormat, required, urlFormat } from 'lib-folder/validation'

import { Arrow, Telegram, WhatSapp, Viber, Plus, Close } from 'components-folder/Icon/'

import SelectInput from 'components-folder/Form/SelectInput'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTelephoneInput from 'components-folder/Form/BootstrapTelephoneInput'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import TagsInputField from 'components-folder/Form/TagsInputField'
import RadioButton from 'components-folder/Form/RadioButton'

const cn = require('bem-cn')('b-collapse')
const cnn = require('bem-cn')('text-input-group')
if (process.env.BROWSER) {
  require('./b-collapse.css')
  require('components-folder/Form/TextInputGroup.css')
}

moment.locale('ru')

const PHONE_OPTIONS = [
  {
    active: true,
    disabled: false,
    value: 'personal',
    label: 'Личный',
  },
  {
    active: false,
    disabled: false,
    value: 'work',
    label: 'Рабочий',
  },
  {
    active: false,
    disabled: false,
    value: 'home',
    label: 'Домашний',
  },
  {
    active: false,
    disabled: false,
    value: 'other',
    label: 'Другой',
  },
]

const EMAIL_OPTIONS = [
  {
    active: true,
    disabled: false,
    value: 'personal',
    label: 'Личный',
  },
  {
    active: false,
    disabled: false,
    value: 'work',
    label: 'Рабочий',
  },
]

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

const notDestroyed = (it) => (!it.destroy)

class RenderFieldPhoneComponent extends Component {
  render() {
    const { dispatch, fields, meta: { touched, error, submitFailed }, options, select } = this.props

    return (
      <div className={cn('wrapper')}>
        {fields.map((it,i) => fields.get(i)).filter(notDestroyed).length === 0 ? fields.push({}) : null}
        {fields.map((exp, index) => {
          const value = fields.get(index)

          if (value.destroy === undefined || value.destroy === false) {
            return (
              <div className={cn('wrapper-b-phone')} key={index}>
                <div className={cn('field-wrapper')}>
                  <Field
                    component={SelectInput}
                    name={`${exp}.phone_type`}
                    label="Тип телефона"
                    options={options}
                  />
                </div>

                <div className={cn('field-wrapper')}>
                  <Field
                    component={BootstrapTelephoneInput}
                    validate={[phoneFormat]}
                    name={`${exp}.phone`}
                    type="text"
                    label="Номер телефона"
                  />
                </div>
                <span
                  className={cn('wrapper-remove').mix('cur')}
                  onClick={async () => {
                    if (fields.get(index).id) {
                      await dispatch(change('ContactInformationCollapse', `${exp}.destroy`, true))
                      this.forceUpdate()
                    } else {
                      fields.remove(index)
                    }
                  }}
                  title="Удалить"
                >
                  <Close className={cn('icon-closed')} />
                </span>
                <div className={cn('wrapper-radio-btn')}>
                  <label className={cn('radio-label')}>Приоритет</label>
                  {value.phone &&
                    <Field
                      name={`preferable_phone`}
                      component={RadioButton}
                      type="radio"
                      className="form-control"
                      id={`${exp}`}
                      value={`${exp}`}
                    />
                  }
                </div>
                <div className={cn('social')}>
                  <label className={cn('social-label').mix('p3 p3_theme_light')}>Укажите Доступные мессенджеры</label>
                  <div className={cn('wrapper-icon-select')}>
                    <div
                      onClick={async () => {
                        // TODO: refactoring
                        await dispatch(
                          change(
                            'ContactInformationCollapse',
                            `${exp}.telegram`,
                            !fields.get(index).telegram
                          )
                        )
                        this.forceUpdate()
                      }}
                      className={cn('wrapper-telegram')}
                    >
                      <Telegram
                        className={cn('telegram-icon', { active: !!fields.get(index).telegram })}
                      />
                    </div>
                    <div
                      onClick={async () => {
                        // TODO: refactoring
                        await dispatch(
                          change(
                            'ContactInformationCollapse',
                            `${exp}.whatsapp`,
                            !fields.get(index).whatsapp
                          )
                        )
                        this.forceUpdate()
                      }}
                      className={cn('wrapper-whatsapp')}
                    >
                      <WhatSapp
                        className={cn('whatsapp-icon', { active: !!fields.get(index).whatsapp })}
                      />
                    </div>
                    <div
                      onClick={async () => {
                        // TODO: refactoring
                        await dispatch(
                          change(
                            'ContactInformationCollapse',
                            `${exp}.viber`,
                            !fields.get(index).viber
                          )
                        )
                        this.forceUpdate()
                      }}
                      className={cn('wrapper-viber')}
                    >
                      <Viber className={cn('viber-icon', { active: !!fields.get(index).viber })} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
        <div className={cn('wrapper-icon')} onClick={() => fields.push({})} title="Добавить">
          <Plus outline={30} className={cn('plus-icon')} />
        </div>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    )
  }
}

const RenderFieldPhone = connect()(RenderFieldPhoneComponent)

class RenderFieldEmailComponent extends Component {
  render() {
    const { dispatch, fields, meta: { touched, error, submitFailed }, options } = this.props

    return (
      <div className={cn('wrapper')}>
        {fields.map((it,i) => fields.get(i)).filter(notDestroyed).length === 0 ? fields.push({}) : null}
        {fields.map((exp, index) => {
          const value = fields.get(index)

          if (value.destroy === undefined || value.destroy === false) {
            return (
              <div className={cn('wrapper-b-email')} key={index}>
                <div className={cn('field-wrapper')}>
                  <Field
                    component={SelectInput}
                    name={`${exp}.email_type`}
                    type="text"
                    label="тип email"
                    options={options}
                  />
                </div>

                <div className={cn('field-wrapper')}>
                  <Field
                    component={BootstrapInput}
                    name={`${exp}.email`}
                    validate={[emailFormat]}
                    type="email"
                    label="Email"
                  />
                </div>
                <span
                  className={cn('wrapper-remove').mix('cur')}
                  onClick={async () => {
                    if (fields.get(index).id) {
                      await dispatch(change('ContactInformationCollapse', `${exp}.destroy`, true))
                      this.forceUpdate()
                    } else {
                      fields.remove(index)
                    }
                  }}
                  title="Удалить"
                >
                  <Close className={cn('icon-closed')} />
                </span>
                <div className={cn('wrapper-radio-btn')}>
                  <label className={cn('radio-label')}>ПРИОРИТЕТ</label>
                  {value.email &&
                    <Field
                      name={`preferable_email`}
                      component={RadioButton}
                      type="radio"
                      className="form-control"
                      value={`${exp}`}
                      id={`${exp}`}
                    />
                  }
                </div>
              </div>
            )
          }
        })}
        <div className={cn('wrapper-icon')} onClick={() => fields.push({})} title="Добавить">
          <Plus outline={30} className={cn('plus-icon')} />
        </div>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    )
  }
}

const RenderFieldEmail = connect()(RenderFieldEmailComponent)

class SelectInputGroupSiteComponent extends Component<Props> {
  render() {
    const { label, fields, dispatch, meta: { touched, error, submitFailed } } = this.props

    return (
      <div className={cnn.mix('form-group')}>
        <label className={cnn('label')}>{label}</label>
        <div className={cnn('input-wrap')}>
        {fields.map((it,i) => fields.get(i)).filter(notDestroyed).length === 0 ? fields.push({}) : null}
          {fields.map((field, index) => (
            <div key={index} className={cnn('wrapper-elements')}>
              <div className={cnn('wrapper-field')}>
                <Field
                  type="text"
                  component={BootstrapInput}
                  name={`${field}.link`}
                  validate={[urlFormat]}
                  className="form-control"
                />
              </div>
              <span
                className={cnn('wrapper-remove').mix('cur')}
                onClick={async () => {
                  if (fields.get(index).id) {
                    await dispatch(change('ContactInformationCollapse', `${field}.destroy`, true))
                    this.forceUpdate()
                  } else {
                    fields.remove(index)
                  }
                }}
                title="Удалить"
              >
                <Close className={cnn('icon-closed')} />
              </span>
            </div>
          ))}
        </div>

        <button className={cnn('add-button').mix('no-outline mb-15')} onClick={() => fields.push({})}>
          <Plus outline={30} className={cnn('plus-icon')} />
        </button>

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }
}

const SelectInputGroupSite = connect()(SelectInputGroupSiteComponent)

class RenderFieldOtherComponent extends Component {
  render() {
    const { dispatch, fields, meta: { touched, error, submitFailed }, options } = this.props
    return (
      <div className={cn('wrapper')}>
        {fields.map((it,i) => fields.get(i)).filter(notDestroyed).length === 0 ? fields.push({}) : null}
        {fields.map((exp, index) => {
          const value = fields.get(index)
          if (!value.destroy) {
            return (
              <div className={cn('wrapper-b-other')} key={index}>
                <div className={cn('field-wrapper')}>
                  <Field
                    component={SelectInput}
                    name={`${exp}.other_type`}
                    label="Мессенджер"
                    options={options}
                  />
                </div>

                <div className={cn('field-wrapper')}>
                  <Field
                    component={BootstrapInput}
                    name={`${exp}.other`}
                    type="text"
                    label="Номер телефона"
                  />
                </div>
                <span
                  className={cn('wrapper-remove').mix('cur')}
                  onClick={async () => {
                    if (fields.get(index).id) {
                      await dispatch(change('ContactInformationCollapse', `${exp}.destroy`, true))
                      this.forceUpdate()
                    } else {
                      fields.remove(index)
                    }
                  }}
                  title="Удалить"
                >
                  <Close className={cn('icon-closed')} />
                </span>
              </div>
            )

          }
        }


        )}
        <div className={cn('wrapper-icon')} onClick={() => fields.push({})} title="Добавить">
          <Plus outline={30} className={cn('plus-icon')} />
        </div>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    )
  }
}

const RenderFieldOther = connect()(RenderFieldOtherComponent)

const connector = compose(
  connect(pick(['employees'])),
  reduxForm({
    form: 'ContactInformationCollapse',
    touchOnChange: true,
  })
)

class ContactInformationCollapse extends Component {
  state = { open: true }

  componentWillMount() {
    const { employees: { current }, initialize } = this.props

    const { account_phones, account_emails, account_messengers, social_urls, skype } = current

    const preferable_email_index = account_emails.findIndex(it => it.preferable)
    const preferable_phone_index = account_phones.findIndex(it => it.preferable)

    initialize({
      preferable_email: `email[${preferable_email_index > 0 ? preferable_email_index : 0}]`,
      preferable_phone: `phone[${preferable_phone_index > 0 ? preferable_phone_index : 0}]`,
      phone: account_phones.map(it => ({
        id: it.id,
        phone: it.number,
        phone_type: PHONE_OPTIONS.find(option => option.value === it.kind),
        telegram: it.telegram,
        whatsapp: it.whatsapp,
        viber: it.viber,
        destroy: false,
      })),
      other: account_messengers.map(it => ({
        id: it.id,
        other_type: MESSENGER_OPTIONS.find(option => option.value === it.name),
        other: it.phones[0],
        destroy: false,
      })),
      email: account_emails.map(it => ({
        id: it.id,
        email: it.email,
        email_type: EMAIL_OPTIONS.find(option => option.value === it.kind),
        destroy: false,
      })),
      social: social_urls.map(it => ({ link: it })),
      skype,
    })
  }

  render() {
    const { open } = this.state

    return (
      <div className={cn} id="statuses">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Контактная информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_close')} />
          ) : (
            <Arrow className={cn('arrow-icon_open')} />
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('body')}>
              <h4>Телефон</h4>
              <FieldArray options={PHONE_OPTIONS} name="phone" component={RenderFieldPhone} />

              <div className={cn('hr')} />

              <h4>Email</h4>
              <FieldArray options={EMAIL_OPTIONS} name="email" component={RenderFieldEmail} />

              <div className={cn('hr')} />

              <h4>Другие способы связи</h4>
               <FieldArray name="other" options={MESSENGER_OPTIONS} component={RenderFieldOther} />
              <div className={cn('wrapper')}>
                <Field component={BootstrapInput} name="skype" type="text" label="Skype" />
              </div>

              <div className={cn('hr')} />

              <div className={cn('wrapper')}>
                <h4>Социальные сети</h4>
                <FieldArray name="social" component={SelectInputGroupSite} label="Соц. сеть" />
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
export default connector(ContactInformationCollapse)
