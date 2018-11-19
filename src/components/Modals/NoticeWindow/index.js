import React, { Component } from 'react'
import {
  Modal,
  Button,
  ControlLabel,
  FormGroup,
  ListGroup,
  ListGroupItem, } from 'react-bootstrap'
import { reduxForm, FieldArray } from 'redux-form'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import isEqual from 'lodash/isEqual'
import SelectInput from 'components-folder/Form/SelectInput'
import MultiFileList from 'components-folder/Form/MultiFileList'

import { sendNotification } from 'redux-folder/actions/vacanciesActions'
import { Close } from 'components-folder/Icon'
import CKeditor from 'components-folder/Form/CKeditor'
import { getEmployees } from 'redux-folder/actions/employeesActions'

import { get, isEmpty } from 'lodash'

const cn = require('bem-cn')('notice-window')

if (process.env.BROWSER) {
  require('./notice-window.css')
}

const initialToForSelect = state => {
  const creator = get(state, 'vacancyCard.current.creator', {})

  return [
    {
      label: creator.name_surname,
      value: creator.email_address,
      avatar: get(creator, 'photo.url', '/public/avatar.png'),
    },
  ]
}

const connector = compose(
  reduxForm({
    form: 'NoticeWindowForm',
    // fields: ['to', 'copy'],
  }),
  connect(state => ({
    state,
    initialValues: {
      to: initialToForSelect(state),
      copy: state.vacancyCard.current.account_vacancies
        .map(({ account = {} }) => ({
          label: account.name_surname,
          value: account.email_address,
          avatar: get(account, 'photo.url', '/public/avatar.png'),
        })),
      subject: 'Новые кандидаты',
      body: `<p>По вакансии ${state.vacancies.current.name} появились новые резюме</p>
             <p>Вакансию можно посмотреть по <a href="${window.location.href}">ссылке</a>.</p>`,
    },
    employeesForSelect: state.employees.data,
  }))
)

class NoticeWindow extends Component {
  componentDidMount() {
    this.props.dispatch(getEmployees())
    this.props.initialize(this.props.initialValues)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.linkedCandidates, this.props.linkedCandidates)) {
      this.props.initialize({
        ...this.props.initialValues,
        candidates_ids: nextProps.linkedCandidates.map(item => item.candidate.id),
      })
    }
  }

  formValues() {
    return this.props.state.form.NoticeWindowForm.values
  }

  renderSelectOption(option) {
    return (
      <span>
        <img src={option.avatar} className={cn('select-avatar')} />
        <span>{option.label}</span>
      </span>
    )
  }

  renderSelectValue(option) {
    return (
      <span>
        <img src={option.avatar || '/public/avatar.png'} className={cn('select-avatar')} />
        <span>{option.label}</span>
      </span>
    )
  }

  async sendEmail() {
    const { dispatch, handleHide, clearLinkedCandidates } = this.props
    const values = this.formValues()

    const params = {
      ...values,
      to: values.to.map(obj => obj.value),
      copy: values.copy.map(obj => obj.value),
    }

    await dispatch(sendNotification(params))
    handleHide()
    clearLinkedCandidates()
  }

  render() {
    const { handleHide, show, employeesForSelect, linkedCandidates } = this.props

    return (
      <div>
        <Modal show={show} onHide={handleHide} dialogClassName={cn()}>
          <div className={cn('wrapper-modal')}>
            <div className={cn('modal-header')}>
              <h1 className="indent-reset">Отправить письмо</h1>
              <div className={cn('modal-close').mix('cur')} onClick={handleHide}>
                <Close className={cn('closed-icon')} />
              </div>
            </div>

            <div className={cn('modal-body')}>
              <FormGroup>
                <Field
                  component={SelectInput}
                  options={!isEmpty(employeesForSelect) && employeesForSelect
                    .map(u => ({ label: u.full_name, value: u.email_address, avatar: u.photo.url }))
                    .sort((u1, u2) => u1.label.localeCompare(u2.label))}
                  valueRenderer={this.renderSelectValue}
                  optionRenderer={this.renderSelectOption}
                  searchable={true}
                  creatable={true}
                  name="to"
                  multi={true}
                  label="Кому"
                  noResultsText="Нет подходящих адресатов"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  component={SelectInput}
                  options={!isEmpty(employeesForSelect) && employeesForSelect
                    .map(u => ({ label: u.full_name, value: u.email_address, avatar: u.photo.url }))
                    .sort((u1, u2) => u1.label.localeCompare(u2.label))}
                  valueRenderer={this.renderSelectValue}
                  optionRenderer={this.renderSelectOption}
                  searchable={true}
                  creatable={true}
                  name="copy"
                  multi={true}
                  label="Копия"
                  noResultsText="Нет подходящих адресатов"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Тема</ControlLabel>
                <Field
                  component={'input'}
                  name="subject"
                  type="text"
                  className={`form-control ${cn('input')}`}
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Сообщение</ControlLabel>
                <Field component={CKeditor} name="body" />
              </FormGroup>
              {linkedCandidates.length > 0 &&
              <ListGroup>
                {linkedCandidates.map(item => <ListGroupItem
                  key={item.id}>{item.candidate.first_name} {item.candidate.last_name}</ListGroupItem>)}
              </ListGroup>}

              <FormGroup>
                <FieldArray
                  name="attachments"
                  component={MultiFileList}
                  multiple
                  label="Прикрепить документы"
                />
              </FormGroup>
            </div>
            <Button bsStyle="primary" className="btn-margin-right" onClick={() => this.sendEmail()}>
              Отправить
            </Button>
            <button onClick={handleHide} className="btn btn-outline">
              Отменить
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connector(NoticeWindow)
