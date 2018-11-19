import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Pin, User, Add, Trash, Pencil } from 'components-folder/Icon'
import { deleteEvent } from '../../../redux/actions/events'

const cn = require('bem-cn')('intranet-calendar')

if (process.env.BROWSER) {
  require('react-big-calendar/lib/css/react-big-calendar.css')
  require('./Container.css')
}

const connector = connect(state => ({
  current: state.events.current,
  user: state.user,
  state,
}))

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  onDelete = () => {
    if (confirm('Вы уверены?')) {
      const { dispatch, current } = this.props
      dispatch(deleteEvent(current.id))
      dispatch(push('/calendar'))
    }
  }

  render() {
    const { events, slotInfo, current, user } = this.props
    return (
      <div className={cn('sidebar-inner')}>
        {slotInfo.slots && (
          <div className={cn('sidebar-inner-date')}>
            {moment(slotInfo.slots[0]).format('DD.MM.YYYY')}
          </div>
        )}
        {slotInfo.slots && (
          <div className={cn('sidebar-inner-weekday')}>
            {moment(slotInfo.slots[0]).format('dddd')}
          </div>
        )}
        <ul>
          {events.length > 0 ? (
            events.map((event, index) => (
              <li className={cn('sidebar-inner-item')} key={index}>
                <div className={cn('wrapper-time-functional')}>
                  <div className={cn('sidebar-inner-start-end')}>
                    {moment(event.start).format('HH:mm')}-{moment(event.end).format('HH:mm')}
                  </div>
                  {
                    event.created_by_id === user.id &&
                    (
                      <div className={cn('functional-block')}>
                        <Link to={`/calendar/events/${event.id}/edit`} title="Редактировать">
                          <Pencil className={cn('sidebar-edit-icon')} />
                        </Link>
                        <div onClick={this.onDelete} key="trash" title="Удалить">
                          <Trash className={cn('sidebar-delete-icon')} />
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className={cn('sidebar-inner-title')}>
                  <Link to={`/calendar/events/${event.id}`}>{event.name}</Link>
                </div>
                <div className={cn('sidebar-inner-type')} style={{ color: event.event_type.color }}>
                  <i
                    className={cn('event-round')}
                    style={{ backgroundColor: event.event_type.color }}
                  />
                  {event.event_type.name}
                </div>
                <div className={cn('sidebar-inner-place')}>
                  <Pin className={cn('sidebar-pin-icon')} />
                  <span>{event.place}</span>
                </div>
                <div className={cn('sidebar-inner-place')}>
                  <User className={cn('sidebar-user-icon').mix('is-user')} />
                  <span>{event.participants_count}</span>
                </div>
              </li>
            ))
          ) : (
            <li className={cn('sidebar-inner-new')}>
              <p className={cn('sidebar-inner-new-text')}>Нет запланированных событий</p>
              <Link
                to={'/calendar/new-event'}
                className="btn btn-primary"
                title="Создать новое событие"
              >
                Новое событие
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default connector(Sidebar)
