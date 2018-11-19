import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Settings } from '../../Icon'
import SettingsMenu from './SettingsMenu'
import {connect} from "react-redux";
import {compose} from "ramda";
import onClickOutside from "react-onclickoutside";

const cn = require('bem-cn')('in-pause-vacancies')

if (process.env.BROWSER) {
  require('./in-pause-vacancies.css')
}
const connector = compose(connect(state => ({ state })), onClickOutside)
const DATA = [
  {
    title: 'Оператор call-центра на исходящие звонки',
    place: 'Москва, Савеловская',
    userName: 'Иванова Ирина',
    time: '21.04.2017',
    progress: [
      {
        label: 'всего',
        value: 18,
        additional: null,
        color: 'transparent',
      },
      {
        label: 'новые',
        value: 2,
        additional: null,
        color: 'green',
      },
      {
        label: 'откликнулись',
        value: 10,
        additional: null,
        color: 'green',
      },
      {
        label: 'скринниг',
        value: 146,
        additional: null,
        color: 'yellow',
      },
      {
        label: 'интервью 1',
        value: 0,
        additional: null,
        color: 'yellow',
      },
      {
        label: 'согласование',
        value: 0,
        additional: null,
        color: 'purple',
      },
      {
        label: 'оффер',
        value: 0,
        additional: null,
        color: 'purple',
      },
      {
        label: 'принят',
        value: 1,
        additional: null,
        color: 'red',
      },
      {
        label: 'отказ',
        value: 1340,
        additional: null,
        color: 'red',
      },
      {
        label: 'архив',
        value: 10340,
        additional: null,
        color: 'red',
      },
    ],
  },
]

class InPauseVacanciesItem extends Component {
  state = {
    open: false,
  }
  updateState(id, status) {
    const { updateState, getVacancies } = this.props
    updateState(id, status).then(() => {
      getVacancies()
    })
  }
  handleClickOutside = () => {
    this.setState({open: false})
  }

  render() {
    const { groups, item } = this.props

    const borderBottomColor = id => groups.find(e => e.id === id)

    return (
      <div className={cn('wrapper-setting')}>
        {/*<button*/}
        {/*className={cn('add-to-work')}*/}
        {/*onClick={() => this.updateState(item.id, 'worked')}*/}
        {/*>вернуть В Работу</button>*/}
        <span
          className={`${cn('settings')} ${this.state.open ? 'active' : ''}`}
          onClick={() => this.setState({ open: !this.state.open })}
          title={this.state.open ? 'Закрыть' : 'Открыть'}
        >
          <Settings outline className={cn('seting-icon').state({ open: this.state.open })} />
        </span>
        {this.state.open && <SettingsMenu item={item} />}
        {/* <Link to={`/recruitment/vacancies/${item.id}`} className={cn('title')}>
          {item.name}
        </Link>
        <div className={cn('item-user-block').mix('clearfix')}>
          <span className={cn('item-place')}>{item.place_of_work}</span>

          <span className={cn('item-user')}>
            <img
              src={`${item.creator && item.creator.profile && item.creator.profile.photo
                ? item.creator.profile.photo.thumb.url
                : '/public/avatar.png'}`}
              className={cn('item-user-avatar')}
            />
            <span className={cn('item-user-name')}>
              {item.creator && item.creator.profile && item.creator.profile.name}{' '}
              {item.creator && item.creator.profile && item.creator.profile.surname}
            </span>
          </span>

          <span className={cn('item-time')}>{moment(item.created_at).format('DD/MM/YYYY')}</span>
        </div>
        <div className={cn('stages')}>
          {item.vacancy_stages &&
            item.vacancy_stages.map(el => (
              <div
                className={cn('stages-item')}
                key={el.name}
                style={{ width: `${100 / item.vacancy_stages.length}%` }}
              >
                <span className={cn('stages-name')}>{el.name}</span>
                <Link className={cn('stages-users-count')} to="/recruitment/my">
                  {el.candidates_count}
                </Link>

                <div
                  className={cn('stages-grop-color')}
                  style={{
                    background: borderBottomColor(el.vacancy_stage_group_id)
                      ? borderBottomColor(el.vacancy_stage_group_id).color
                      : '#fff',
                  }}
                />
              </div>
            ))}
        </div> */}
      </div>
    )
  }
}
export default connector(InPauseVacanciesItem)
