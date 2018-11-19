import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import isEqual from 'lodash/isEqual'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Row, Col } from 'react-bootstrap'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import CustomToolbar from './CustomToolbar'
import Sidebar from './Sidebar'
import Tabs from './Tabs'
import { Plus } from 'components-folder/Icon'
import { getEvents } from 'redux-folder/actions/events'
// import events from './events';
// import {  } from '../../../redux/actions/events';

const cn = require('bem-cn')('intranet-calendar')

if (process.env.BROWSER) {
  require('react-big-calendar/lib/css/react-big-calendar.css')
  require('./Container.css')
}
BigCalendar.momentLocalizer(moment)

const messages = {
  allDay: 'Весь день',
  previous: 'Назад',
  next: 'Далее',
  today: 'Сегодня',
  month: 'Месяц',
  week: 'Неделя',
  day: 'День',
  agenda: 'Список',
  event: 'Событие',
  date: 'Дата',
  time: 'Время',
  showMore: total => (total > 1 ? `+${total} мероприятия` : `+${total} мероприятие`),
}

const formats = {
  dayFormat: 'dd, DD MMM',
  dayHeaderFormat: 'DD MMMM, YYYY',
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
    let date
    if (moment(start).format('YYYY') === moment(end).format('YYYY')) {
      date = `${moment(start).format('MM') === moment(end).format('MM')
        ? `${moment(start).format('DD')} - ${moment(end).format('DD')}, ${moment(end).format(
            'MMMM, YYYY'
          )}`
        : `${moment(start).format('DD MMM')} - ${moment(end).format('DD MMM')}, ${moment(
            end
          ).format('YYYY')}`}`
    } else {
      date = `${moment(start).format('DD MMM, YYYY')} - ${moment(end).format('DD MMM, YYYY')}`
    }
    return date
  },
  monthHeaderFormat: 'MMMM, YYYY',
  agendaHeaderFormat: 'DD MMMM, YYYY',
}

const CustomEvent = data => {
  return (
    <div>
      <span className={cn('event-text')}>
        <i
          className={cn('event-round')}
          style={{ backgroundColor: data.event.event_type && data.event.event_type.color }}
        />
        {data.title}
      </span>
    </div>
  )
}

const CustomEventList = data => {
  return (
    <div>
      <div className={cn('wrapper-event-text')}>
        <i
          className={cn('event-round')}
          style={{ backgroundColor: data.event.event_type && data.event.event_type.color }}
        />
        <p className={cn('text-title')}>{data.title}</p>
      </div>
      <p className={cn('place')}>{data.event.place}</p>
    </div>
  )
}

const eventStyle = (event, start, end, isSelected) => {
  return {
    className: `${cn('event')}`,
    style: { border: `1px solid ${event.event_type && event.event_type.color}` },
  }
}

const CustomAgenda = data => (
  <div>
    <div>{moment(data.day).format('DD.MM')}</div>
    <div className={cn('week-day')}>{moment(data.day).format('dd')}</div>
  </div>
)

const CustomWeekHeader = data => {
  return <div className={cn('week-day')}>{moment(data.date).format(data.format)}</div>
}

const CustomDayHeader = data => {
  return (
    <div className={cn('week-day')({ position: 'header' })}>{moment(data.date).format('dddd')}</div>
  )
}

const CustomWeekEvent = data => {
  return (
    <div>
      <div>{moment(data.day).format('DD MMM')}</div>
      <div className={cn('week-day')}>{moment(data.day).format('dd')}</div>
    </div>
  )
}

const connector = connect(
  state => ({
    events: state.events.data,
    types: state.events.types,
  }),
  {}
)

class Container extends Component {
  static defaultTypes = {
    types: [],
  }
  static propTypes = {
    events: PropTypes.array.isRequired,
    types: PropTypes.array,
  }
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      eventsType: [],
      slotInfo: {},
    }
  }

  componentWillMount() {
    this.setState({ eventsType: this.props.events })
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getEvents())
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.events, nextProps.events)) {
      this.setState({ eventsType: nextProps.events })
    }
  }

  setType(type) {
    const eventsType =
      type.name === 'all'
        ? this.props.events
        : this.props.events.filter(event => event.event_type_id === type.id)
    this.setState({ eventsType })
  }

  render() {
    const { types, dispatch } = this.props
    const { eventsType, slotInfo, events } = this.state
    return (
      <div className={'container'}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
          </Col>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <div className={cn('head')}>
              <h1 className={'indent_20'}>Календарь</h1>
              <div>
                <Link to={`/calendar/new-event`} title="Создать новое событие">
                  <Plus outline={40} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className={cn}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <div className={cn('tabs')}>
                {types && <Tabs types={types} setType={type => this.setType(type)} />}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8} lgOffset={1} md={8} mdOffset={1} sm={9} smOffset={0}>
              <div className={cn('calendar')}>
                <BigCalendar
                  {...this.props}
                  messages={messages}
                  selectable
                  events={eventsType}
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={event => dispatch(push(`/calendar/events/${event.id}`))}
                  onSelectSlot={slotInfo =>
                    this.setState({
                      events: eventsType.filter(event => {
                        return (
                          moment(slotInfo.start).isSameOrAfter(event.start, 'day') &&
                          moment(slotInfo.end).isSameOrBefore(event.end, 'day')
                        )
                      }),
                      slotInfo,
                    })}
                  onView={view => this.setState({ view })}
                  eventPropGetter={eventStyle}
                  components={{
                    toolbar: CustomToolbar,
                    event: CustomEvent,
                    agenda: {
                      date: CustomAgenda,
                      event: CustomEventList,
                    },
                    week: {
                      header: CustomWeekHeader,
                      event: CustomEvent,
                    },
                    day: {
                      header: CustomDayHeader,
                      event: CustomEvent,
                    },
                  }}
                  formats={formats}
                />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cn('wrapper-sidebar')}>
                {slotInfo.slots && (
                  <div className={cn('sidebar')}>
                    <Sidebar events={events} slotInfo={slotInfo} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connector(Container)
