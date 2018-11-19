import React, { Component } from 'react'
import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('intranet-calendar')

if (process.env.BROWSER) {
  require('react-big-calendar/lib/css/react-big-calendar.css')
  require('./Container.css')
}

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
}

export default class CustomToolbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 'month',
    }
  }

  goToBack = () => {
    this.props.onNavigate('PREV')
  }

  goToNext = () => {
    this.props.onNavigate('NEXT')
  }

  goToCurrent = () => {
    this.props.onNavigate('TODAY')
  }

  changeView = view => {
    this.props.onViewChange(view)
  }

  render() {
    const { views, view, label } = this.props
    return (
      <div className={cn('toolbar-container')}>
        <div>
          <h3 className={cn('label-date')}>{label}</h3>
          <span className={cn('btn-arrow').mix('cur')} onClick={() => this.goToBack()}>
            <Arrow className={cn('arrow-icon')({ rotate: 'left' })} />
          </span>
          <span className={cn('btn-arrow').mix('cur')} onClick={() => this.goToNext()}>
            <Arrow className={cn('arrow-icon')({ rotate: 'right' })} />
          </span>
          <span className={cn('btn-current').mix('cur')} onClick={() => this.goToCurrent()}>
            {messages.today}
          </span>
          <span className={cn('btn-view-container')}>
            {views.map((item, idx) => (
              <span key={Math.random()}>
                <span
                  className={cn('btn-view')
                    .mix('cur')
                    .state({
                      current: view === item,
                    })}
                  onClick={() => {
                    this.setState({ view: item })
                    this.changeView(item)
                  }}
                >
                  {messages[item]}
                </span>
                {/* {views.length - 1 > idx && <span className={cn('vertical-bar')}>|</span>} */}
              </span>
            ))}
          </span>
        </div>
      </div>
    )
  }
}
