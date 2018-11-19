import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap'
import { getEventTypes } from 'redux-folder/actions/events'

import Breadcrumbs from 'components-folder/Breadcrumbs/'

import { Calendar } from 'components-folder/Icon'

import SearchForm from './SearchForm'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import ReduxFormDropzoneEvent from 'components-folder/Form/ReduxFormDropzoneEvent'
import SelectInput from 'components-folder/Form/SelectInput'
import CKeditor from 'components-folder/Form/CKeditor'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import { createEvent, getParticipants } from '../../../redux/actions/events'
import { required, dateTimeFormat, greaterThanStart } from '../../../lib/validation'
import {toastr} from 'react-redux-toastr'
import scrollToComponent from 'components-folder/ScrollToComponent';
import ReactDOM from 'react-dom'

const cn = require('bem-cn')('intranet-calendar-event')

if (process.env.BROWSER) {
  require('react-big-calendar/lib/css/react-big-calendar.css')
  require('./EventForm.css')
}

const optionsRepeat = [
  { label: 'Никогда', value: 'never' },
  { label: 'Раз в неделю', value: 'once-a-week' },
]

const connector = compose(
  connect(
    state => ({
      events: state.events.data,
      participants: state.events.participants,
      types: state.events.types,
      state,
    }),
    { createEvent, getParticipants }
  ),
  reduxForm({ form: 'NewEvent' })
)

class NewEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    toastr.clean()
    dispatch(getEventTypes())
  }

  typesNormalize(types) {
    return types.map(type => {
      return { label: type.name, value: type.id }
    })
  }

  onSubmit = () => {
    this.props.createEvent(this.props.state)
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

  onReset = () => {
    window.history.back()
  }

  render() {
    const { types, handleSubmit, dispatch } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className={cn.mix('container')}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Breadcrumbs
                breadcrumbs={[
                  { name: 'Новое событие', active: true },
                ]}
              />
            </Col>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <div className={cn('head')}>
                <h1>Новое событие</h1>
                {/*<DeleteIcon className={cn('delete-icon-head')}/>*/}
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
                      {/*<Col xs={6}>*/}
                      {/*<Field*/}
                      {/*name="repeat"*/}
                      {/*label="Повторить"*/}
                      {/*component={SelectInput}*/}
                      {/*options={optionsRepeat}*/}
                      {/*/>*/}
                      {/*</Col>*/}
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
                            removable
                            multiple={false}
                            cleanField={() => dispatch(change('NewEvent', 'file', ''))}
                            label="Добавить файл"
                            className={cn('dropzone')
                              .mix('cur')
                              .toString()}
                            icon={false}
                          />
                          {/*<div className={cn('b-uploaded-file')}>*/}
                          {/*<div>*/}
                          {/*<Link to={``} className={cn('name-file')}>Название файла</Link>*/}
                          {/*<p className={cn('value-file')}>.doc, 14 Кб</p>*/}
                          {/*</div>*/}
                          {/*/!*<DeleteIcon className={cn('delete-icon')}/>*!/*/}
                          {/*</div>*/}
                        </div>
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

export default connector(NewEvent)
