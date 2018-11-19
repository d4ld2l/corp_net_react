import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import { compose, pick, evolve, tap, map, prop } from 'ramda'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap'

import Breadcrumbs from 'components-folder/Breadcrumbs/'

import { Calendar, Trash } from 'components-folder/Icon'

import SearchForm from './SearchForm'
import { getEventTypes } from 'redux-folder/actions/events'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import ReduxFormDropzoneEvent from 'components-folder/Form/ReduxFormDropzoneEvent'
import SelectInput from 'components-folder/Form/SelectInput'
import CKeditor from 'components-folder/Form/CKeditor'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import Loader from 'components-folder/Loader'
import { getEvent, updateEvent } from 'redux-folder/actions/events'
import { add, toggleAll } from 'redux-folder/actions/searchParticipants'
import { SearchParticipant } from 'presenters-folder'
import { required, dateTimeFormat, greaterThanStart } from 'lib-folder/validation'
import { deleteEvent } from 'redux-folder/actions/events'
import scrollToComponent from 'components-folder/ScrollToComponent';
import ReactDOM from 'react-dom'

const cn = require('bem-cn')('intranet-calendar-event')

if (process.env.BROWSER) {
  require('react-big-calendar/lib/css/react-big-calendar.css')
  require('./EventForm.css')
}

const connector = compose(
  connect(state => ({
    current: state.events.current,
    types: state.events.types,
    loaders: state.loaders,
    state,
  })),
  reduxForm({
    form: 'EditEvent',
    touchOnChange: true,
  })
)

class EditEvent extends Component {
  state = { open: false }

  componentDidMount() {
    const { dispatch } = this.props
    this.initialize()
    toastr.clean()
    dispatch(getEventTypes())
  }

  initialize = async () => {
    const { dispatch, initialize, match } = this.props
    await dispatch(getEvent(match.params.id))
    const { current } = this.props

    current.participants_list
      .map(it => SearchParticipant({ model_name: 'Account', ...it }))
      .forEach(compose(dispatch, add))

    if (current.available_for_all) {
      dispatch(toggleAll())
    }

    compose(
      initialize,
      evolve({ ends_at: moment, starts_at: moment }),
      pick(['name', 'event_type_id', 'description', 'starts_at', 'ends_at', 'place'])
    )(current)
  }

  typesNormalize = types => types.map(type => ({ label: type.name, value: type.id }))

  onSubmit = async () => {
    const { dispatch, state, current } = this.props
    const res_status = await dispatch(updateEvent(current.id, state))
    if (res_status === 200){
      toastr.success('Событие успешно обновлено.')
      dispatch(push(`/calendar/events/${current.id}`))
    } else{
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  componentDidUpdate(prevProps){
    if (!prevProps.submitFailed && this.props.submitFailed){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  checkError(){
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  onDelete = async () => {
    if (confirm('Вы уверены?')) {
      const { dispatch, current } = this.props
      const res_status = await dispatch(deleteEvent(current.id))
      if (res_status == 200){
        toastr.success('Событие успешно удалено.')
        dispatch(push('/calendar'))
      } else{
        toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
      }
    }
  }

  onReset = () => window.history.back()

  render() {
    const { types, loaders, current, handleSubmit, dispatch } = this.props

    if (loaders.event) {
      return <Loader />
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className={cn.mix('container')}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Breadcrumbs
                breadcrumbs={[
                  { name: current.name, location: `/calendar/events/${current.id}` },
                  { name: 'Редактирование события', active: true },
                ]}
              />
            </Col>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <div className={cn('head')}>
                <h1 className={'indent_20'}>Редактирование события</h1>
                <div title="Удалить событие" onClick={this.onDelete}>
                  <Trash outline className={cn('trashoutline-icon')} />
                </div>
              </div>
            </Col>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <div className={cn('b-event')}>
                <Row>
                  <Col xs={7}>
                    <p className={cn('warning').mix('p4 p4_theme_light_third indent_15')}>* — поля обязательны для заполнения</p>
                    <Row>
                      <Col xs={12}>
                        <div className={cn('required')}>
                          <Field
                            component={BootstrapInput}
                            validate={[required]}
                            name="name"
                            type="text"
                            label="Название"
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <Field
                          component={BootstrapInput}
                          name="place"
                          type="text"
                          label="Место проведения"
                        />
                      </Col>
                      <Col xs={12}>
                        <Row>
                          <Col xs={6}>
                            <div className={cn('required')}>
                              <Field
                                name="starts_at"
                                label="Начало"
                                validate={[required, dateTimeFormat]}
                                component={DateTimeField}
                                dateFormat="DD-MM-YYYY"
                                timeFormat={true}
                              />
                              <Calendar className={cn('calendar-icon')} />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className={cn('required')}>
                              <Field
                                name="ends_at"
                                label="Окончание"
                                validate={[required, dateTimeFormat, greaterThanStart]}
                                component={DateTimeField}
                                dateFormat="DD-MM-YYYY"
                                timeFormat={true}
                              />
                              <Calendar className={cn('calendar-icon')} />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={12}>
                        <div className={cn('required')}>
                          <Field
                            name="event_type_id"
                            label="Категория"
                            validate={[required]}
                            component={SelectInput}
                            placeholder="Не выбрана"
                            noResultsText="Нет категорий"
                            options={this.typesNormalize(types)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <Field
                          component={CKeditor}
                          name="description"
                          type="text"
                          label="Описание"
                        />
                        <div className={cn('b-upload-file')}>
                          <Field
                            name="file"
                            component={ReduxFormDropzoneEvent}
                            style={{}}
                            multiple={false}
                            label="Добавить файл"
                            className={cn('dropzone')
                              .mix('cur')
                              .toString()}
                            icon={false}
                          />
                        </div>
                        {current.documents &&
                          current.documents.length > 0 &&
                          current.documents.map(doc => (
                            <div key={doc.id} className={cn('b-file')}>
                              <div>
                                <a
                                  className={cn('link-file').mix('link link_theme_light_third indent_reset')}
                                  href={`${doc.file.url}`}
                                  target="_blank"
                                >
                                  {doc.name}
                                </a>
                              </div>
                            </div>
                          ))}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={5}>
                    <SearchForm />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <button className="btn btn-primary btn-margin-right " type="submit" onClick={()=> this.checkError()}>
                сохранить
              </button>
              <button className="btn btn-outline" type="reset" onClick={this.onReset}>
                отменить
              </button>
            </Col>
          </Row>
        </div>
      </form>
    )
  }
}

export default connector(EditEvent)
