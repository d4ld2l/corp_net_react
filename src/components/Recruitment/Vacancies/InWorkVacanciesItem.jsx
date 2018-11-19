import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Settings } from '../../Icon/'
import SettingsMenu from './SettingsMenu'
import {connect} from "react-redux";
import {compose} from "ramda";
import onClickOutside from "react-onclickoutside";


const cn = require('bem-cn')('in-work-vacancies')

if (process.env.BROWSER) {
  require('./InWorkVacancies.css')
}
// const connector = connect(state => ({ state }))
const connector = compose(connect(state => ({ state })), onClickOutside)



class InWorkVacanciesItem extends Component {
  state = {
    open: false,
  }

  handleClickOutside = () => {
    this.setState({open: false})
  }

  render() {
    const { groups, item } = this.props
    const { open } = this.state
    const borderBottomColor = id => groups.find(e => e.id === id)
    return (
      // <div className={cn('item')}>
      <div className={cn('wrapper-setting')}>
        <span
          className={`${cn('settings')} ${open ? 'active' : ''}`}
          onClick={() => this.setState({ open: !open })}
          title={open ? 'Закрыть' : 'Открыть'}
        >
          <Settings outline className={cn('seting-icon').state({ open: open })} />
        </span>
        {open && <SettingsMenu item={item} />}
      </div>

      /* <Link to={`/recruitment/vacancies/${item.id}`} className={cn('title')}>
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
                key={Math.random()}
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
        </div>
      </div> */
    )
  }
}
export default connector(InWorkVacanciesItem)
