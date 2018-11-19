import React, { Component } from 'react'
import { v4 } from 'uuid'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'ramda'

import { Settings, Calendar } from 'components-folder/Icon'
import { SETTING_DATA } from './data'
import onClickOutside from 'react-onclickoutside'
import { getFilteredAnalyticsStats } from '../../../redux/actions/analyticsActions'

import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import DateTime from 'react-datetime'
import Select from 'react-select'
import Funnel from './Funnel'
import Graph from './Graph'
import Table from './Table'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'

const cn = require('bem-cn')('analytics')

if (process.env.BROWSER) {
  require('./style.css')
}

const connector = compose(reduxForm({ form: 'SettingHowToDisplay' }), onClickOutside)

class SettingHowToDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setting: SETTING_DATA,
      open: false,
      currentTab: SETTING_DATA[0].nameTab,
      selectedOption: '',
      start_date: moment().subtract(1, 'week'),
      end_date: moment(),
      value: [],
      keys: [Math.random(), Math.random()],
      endDateOpen: false,
      startDateOpen: false,
    }

    this.submit = this.submit.bind(this)
  }

  handlerChange = selectedOption => {
    this.setState({ selectedOption })
    const { dispatch } = this.props

    switch (selectedOption.value) {
      case 'week':
        dispatch(
          getFilteredAnalyticsStats({
            start_date:
              moment()
                .subtract(1, 'weeks')
                .format('YYYY-MM-DD') + 'T00:00',
          })
        )
        break
      case 'month':
        dispatch(
          getFilteredAnalyticsStats({
            start_date:
              moment()
                .subtract(1, 'months')
                .format('YYYY-MM-DD') + 'T00:00',
          })
        )
        break
      case 'year':
        dispatch(
          getFilteredAnalyticsStats({
            start_date:
              moment()
                .subtract(1, 'years')
                .format('YYYY-MM-DD') + 'T00:00',
          })
        )
        break
      case 'period':
        this.submit()
        break
      default:
        dispatch(
          getFilteredAnalyticsStats({
            start_date:
              moment()
                .subtract(1, 'weeks')
                .format('YYYY-MM-DD') + 'T00:00',
          })
        )
        break
    }
  }

  submit = (value, name) => {
    const { start_date, end_date } = this.state
    const { dispatch } = this.props

    if (name === 'start_date') {
      this.setState({ start_date: value })
    }
    if (name === 'end_date') {
      this.setState({ end_date: value })
    }

    if (value !== '') {
      if (
        moment(name === 'start_date' ? value : start_date) <=
        moment(name === 'end_date' ? value : end_date)
      ) {
        toastr.clean()
        dispatch(
          getFilteredAnalyticsStats({
            start_date:
            moment(name === 'start_date' ? value : start_date).format('YYYY-MM-DD') + 'T00:00',
            end_date: moment(name === 'end_date' ? value : end_date).format('YYYY-MM-DD') + 'T23:59',
          })
        )
      } else {
        toastr.error('Начальная дата не может быть больше конечной.')
      }
    } else {
      toastr.error('Bыберите дату.')
    }
    this.setState({keys: [Math.random(), Math.random()]})
  }

  handleClickOutside = () => {
    this.handlerClose()
  }

  render() {
    const { currentTab, setting, open, selectedOption, start_date, end_date } = this.state
    const value = selectedOption && selectedOption.value
    const valid = current => current.isBefore(moment().subtract(0, 'day'))

    return (
      <div className={cn('wrapper')}>
        <div className={cn('wrapper-func-elements')}>
          <div className={cn('filter-period')} onClick={() => this.handlerClose()}>
            <Select
              name="filter-period"
              value={value}
              onChange={this.handlerChange}
              clearable={false}
              searchable={false}
              placeholder={'Показать'}
              options={[
                { value: 'week', label: 'За неделю' },
                { value: 'month', label: 'За месяц' },
                { value: 'year', label: 'За год' },
                { value: 'period', label: 'За период' },
              ]}
            />
            {selectedOption.value === 'period' && (
              <form className={cn('calendar-wrapper')}>
                <div className={cn('calendar')}
                     onClick={() => { this.setState({startDateOpen: !this.state.startDateOpen})}}
                >
                  <DateTime
                    name={'start_date'}
                    locale="ru"
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    key={this.state.keys[0]}
                    value={start_date}
                    open={ this.state.startDateOpen}
                    isValidDate={valid}
                    inputProps={{ readOnly: true, className: cn('readonly-input form-control') }}
                    onChange={value => this.submit(value, 'start_date')}
                  />
                  <Calendar className={cn('calendar-icon')} />
                </div>
                <div className={cn('calendar-dash')}>—</div>
                <div className={cn('calendar')}
                     onClick={() => { this.setState({endDateOpen: !this.state.endDateOpen})}}
                >
                  <DateTime
                    name='end_date'
                    locale="ru"
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    key={this.state.keys[1]}
                    value={end_date}
                    open={ this.state.endDateOpen}
                    isValidDate={valid}
                    inputProps={{ readOnly: true, className: cn('readonly-input form-control') }}
                    onChange={value => this.submit(value, 'end_date')}
                  />
                  <Calendar className={cn('calendar-icon')}/>
                </div>
              </form>
            )}
          </div>
          <div className={cn('setting')}>
            <span
              className={cn('setting-icon-wrapper')
                .mix('cur')
                .state({ open: open })}
              onClick={() => {
                open ? this.handlerClose() : this.handlerOpen()
              }}
              title={open ? 'Закрыть' : 'Открыть'}
            >
              <Settings className={cn('setting-icon')} />
            </span>
            {open && (
              <ul className={cn('setting-tabs-list')}>
                {setting.map(it => (
                  <li
                    key={v4()}
                    className={cn('setting-tabs-list-item')
                      .mix('cur')
                      .state({ current: currentTab === `${it.nameTab}` })}
                    onClick={() => this.setState({ currentTab: `${it.nameTab}` })}
                  >
                    <p className={cn('setting-tabs-list-item-text')}>{it.title}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div onClick={() => this.handlerClose()}>
          {currentTab === 'funnel' && <Funnel {...this.props} />}
          {currentTab === 'graph' && <Graph {...this.props} />}
          {currentTab === 'table' && <Table {...this.props} />}
        </div>
      </div>
    )
  }

  handlerOpen = () => {
    this.setState({ open: true })
  }

  handlerClose = () => {
    this.setState({ open: false })
  }
}
export default connector(SettingHowToDisplay)
