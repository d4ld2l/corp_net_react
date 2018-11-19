import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'

import { Arrow, Plus, Trash } from 'components-folder/Icon'
import { Field, FieldArray, reduxForm } from 'redux-form'
import RadioButton from 'components-folder/Form/RadioButton'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import SelectInputGroupSite from 'components-folder/Form/SelectInputGroupSite'

const cn = require('bem-cn')('candidate-tab-contact-information')

if (process.env.BROWSER) {
  require('./main.css')
}

const phoneArray = ({ fields, meta: { touched, error } }) => (
  <div>{fields.map((exp, index) => (
    <div key={index} className={cn('wrapper-array').mix('required')}>
      <Field
        name={`${exp}.phone`}
        component={BootstrapInput}
        label="Телефон"
        type="text"
        className={cn('array-input')}
      />
      {index !== fields.length - 1 ? (
        <button
          tabIndex={'0'}
          className={cn('add-button').mix('cur')}
          onClick={() => fields.remove(index)}
          title="Удалить"
        >
          <Trash className={cn('trash-icon').mix('icon')}/>
        </button>
      ) : (
        <button className={cn('add-button')}
                onClick={() => fields.push({})}>
          <Plus outline={30} className={cn('plus-icon')}/>
        </button>)}
      <Field
        name='preferred_contact_type'
        component={RadioButton}
        type="radio"
        className="form-control"
        value={`${index}-phone`}
        label="Желаемый способ связи"
        id={`phone-${index}`}
      />
    </div>))}
    {touched && error && <p className="error">{error}</p>}
  </div>
)

const emailArray = ({ fields, meta: { touched, error } }) => (
  <div>{fields.map((exp, index) => (
    <div key={index} className={cn('wrapper-array').mix('required')}>
      <Field
        name={`${exp}.email`}
        component={BootstrapInput}
        label="Почта"
        type="text"
        className={cn('array-input')}
      />
      {index !== fields.length - 1 ? (
        <button
          tabIndex={'0'}
          className={cn('add-button').mix('cur')}
          onClick={() => fields.remove(index)}
          title="Удалить"
        >
          <Trash className={cn('trash-icon').mix('icon')}/>
        </button>
      ) : (
        <button className={cn('add-button')}
                onClick={() => fields.push({})}>
          <Plus outline={30} className={cn('plus-icon')}/>
        </button>)}
      <Field
        name='preferred_contact_type'
        component={RadioButton}
        type="radio"
        className="form-control"
        value={`${index}-email`}
        label="Желаемый способ связи"
        id={`email-${index}`}
      />
    </div>))}
    {touched && error && <p className="error">{error}</p>}
  </div>
)

function preferredContact(contacts) {
  if (contacts.length === 0) return '0-phone'
  const contact = contacts.find(item => item.preferred)
  if (!contact) return '0-phone'
  let prefer = ''
  let emails = 0
  let phones = 0
  contacts.forEach((item) => {
    if(item.preferred && item.contact_type === 'email') {
      prefer = `${emails}-${item.contact_type}`
    }
    if(item.preferred && item.contact_type === 'phone') {
      prefer = `${phones}-${item.contact_type}`
    }
    if(item.contact_type === 'email') emails = emails + 1
    if(item.contact_type === 'phone') phones = phones + 1
  })
  return prefer
}

const validate = values => {
  const errors = {}

  if (typeof values.phones[0] === 'string' || !values.phones[0].phone || values.phones[0].phone.trim().length === 0) {
    errors.phones = 'Обязательное поле'
  }

  if (typeof values.emails[0] === 'string' || !values.emails[0].email || values.emails[0].email.trim().length === 0) {
    errors.emails = 'Обязательное поле'
  }

  return errors
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabContactInformation',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: {
      additional_contacts_attributes: [''],
      preferred_contact_type: '0-phone',
      phones: [''],
      emails: [''],
    },
    validate,
  }),
  connect(state => ({
    form: state.form.CandidateTabContactInformation,
    initialValues: state.candidates.parsedResume.contactInformation,
    candidate: state.candidates.current,
  })),
)

class CandidateTabContactInformation extends Component{
  state = {
    open: true,
  }

  componentWillMount() {
    const { initialize, candidateId, candidate } = this.props
    if (candidateId) {
      const { resume } = candidate
      initialize({
        emails: resume.resume_contacts.filter(item => item.contact_type === 'email').length > 0 ?
          resume.resume_contacts.filter(item => item.contact_type === 'email').map(item => ({ email: item.value })) : [''],
        phones: resume.resume_contacts.filter(item => item.contact_type === 'phone').length > 0 ?
          resume.resume_contacts.filter(item => item.contact_type === 'phone').map(item => ({ phone: item.value })) : [''],
        skype: resume.resume_contacts.find(item => item.contact_type === 'skype') ?
          resume.resume_contacts.find(item => item.contact_type === 'skype').value : '',
        preferred_contact_type: preferredContact(resume.resume_contacts),
        additional_contacts_attributes:
          resume.additional_contacts.length > 0 ? resume.additional_contacts : [''],
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  render() {
    const { open } = this.state

    return (
      <div className={cn} id="contact_information">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Контактная информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <section>
                <FieldArray
                  name={'phones'}
                  component={phoneArray}
                />
                <FieldArray
                  name={'emails'}
                  component={emailArray}
                />
                <div className={cn('wrapper-skype')}>
                  <Field component={BootstrapInput} name="skype" type="text"
                         showLabel label="Skype" toIndent/>
                </div>

                <FieldArray
                  name="additional_contacts_attributes"
                  component={SelectInputGroupSite}
                  label="Добавить сайт"
                />
              </section>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabContactInformation)
