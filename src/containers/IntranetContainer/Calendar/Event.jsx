import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'

import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap'

import moment from 'moment'

import Breadcrumbs from 'components-folder/Breadcrumbs/'

import { Calendar, Pin, Plus, Pencil, Trash } from 'components-folder/Icon'

import SearchFormEvent from './SearchFormEvent'
import { getEvent, deleteEvent } from '../../../redux/actions/events'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('intranet-calendar-event-view')

if (process.env.BROWSER) {
  require('./Event.css')
}

const connector = connect(
  state => ({
    current: state.events.current,
    profiles: state.employees.data,
    user: state.user,
    loaders: state.loaders,
    state,
  }),
  {
    getEvent,
  }
)

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  componentWillMount() {
    const { getEvent, match } = this.props
    getEvent(match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    const { getEvent, match } = this.props
    if (nextProps.match.params.id !== match.params.id) {
      getEvent(nextProps.match.params.id)
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

  onEdit = () => {
    const { current: { id }, dispatch } = this.props
    dispatch(push(`/calendar/events/${id}/edit`))
  }

  render() {
    const { current, loaders, profiles, user } = this.props

    if (loaders.event) {
      return <Loader />
    }

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs
              breadcrumbs={[
                { name: current.name, active: true }
              ]}
            />
          </Col>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <div className={cn('head')}>
              <h1 className={'indent_20'}>{current.name}</h1>
              {current.created_by_id === user.id && (
                <div className={cn('wrapper-functional-btn')}>
                  <Link
                    to={`/calendar/new-event`}
                    className={cn('margin-right')}
                    title="Создать новое событие"
                  >
                    <Plus outline={40} />
                  </Link>
                  {[
                    <div
                      onClick={this.onEdit}
                      key="pencil"
                      className={cn('margin-right')}
                      title="Изменить событие"
                    >
                      <Pencil outline className={cn('edit-icon-head')} />
                    </div>,
                    <div onClick={this.onDelete} key="trash" title="Удалить событие">
                      <Trash outline className={cn('delete-icon-head')} />
                    </div>,
                  ]}
                </div>
              )}
            </div>
          </Col>
          <address
            className={cn('address').mix(
              'col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-12 col-xs-12'
            )}
          >
            <Row>
              <div className={cn('info-block').mix('col-md-4 col-xs-6')}>
                <div className={cn('wrapper-icon')}>
                  <Calendar outline className={cn('calendar-icon')} />
                </div>
                <div>
                  <span className={cn('label').mix('p3 p3_theme_light')}>Дата и время проведения</span>
                  <time className={'p1 p1_theme_light_first'} dateTime="2017-08-21">
                    {moment(current.starts_at).format('DD.MM.YY, HH:mm')} –{' '}
                    {moment(current.ends_at).format('DD.MM.YY, HH:mm')}
                  </time>
                </div>
              </div>
              <div className={cn('info-block').mix('col-md-5 col-xs-6')}>
                <div className={cn('wrapper-icon')}>
                  <Pin className={cn('map-icon')} />
                </div>
                <div>
                  <span className={cn('label').mix('p3 p3_theme_light')}>Место проведения </span>
                  <p className={'p1 p1_theme_light_first indent_reset'}>{current.place}</p>
                </div>
              </div>
            </Row>
          </address>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <section className={cn('wrapper-event-search')}>
              <div className={cn('b-event')}>
                <artcile>
                  <header className={cn('header')}>
                    <p
                      className={cn('name').mix('p3 p3_theme_light indent_reset')}
                      style={{ color: current.event_type && current.event_type.color }}
                    >
                      <i
                        className={cn('event-round')}
                        style={{ backgroundColor: current.event_type && current.event_type.color }}
                      />
                      {current.event_type && current.event_type.name}
                    </p>
                    <hr className={cn('hr')} />
                    {current.created_by && (
                      <p className={cn('autor').mix('p3 p3_theme_light indent_reset')}>Автор — {current.created_by.fullname}</p>
                    )}
                  </header>
                  <main>
                    <p
                      className={cn('text').mix('p1 p1_theme_light_first')}
                      dangerouslySetInnerHTML={{ __html: current.description }}
                    />
                    <div>
                      {current.documents &&
                      current.documents.length > 0 &&
                      current.documents.map(doc => (
                        <a className={cn('link-file').mix('link link_theme_light_third indent_reset')} href={`${doc.file.url}`} target="_blank">
                          {doc.name}
                        </a>
                      ))}
                    </div>
                  </main>
                </artcile>
              </div>
              <SearchFormEvent />
            </section>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Event)
