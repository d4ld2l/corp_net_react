import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Settings } from '../../Icon/'
import SettingsMenu from './SettingsMenu'
import get from 'lodash/get'

const cn = require('bem-cn')('archive-vacancies')

if (process.env.BROWSER) {
  require('./archive-vacancies.css')
}

export default class ArchiveVacanciesItem extends Component {
  state = {
    open: false,
  }
  render() {
    const { item } = this.props

    return (
      <div className={cn('item')}>
        <div className={cn('item-head')}>
          <Link className={cn('item-link').mix('link link_theme_light_first indent_5')} to={`/recruitment/vacancies/${item.id}`}>
            {item.name}
          </Link>
        </div>

        <div className={cn('head-data')}>
          <div
            className={cn('avatar')}
            style={{
              background: `url(${get(item, 'creator.photo.url', '/public/avatar.png')}) center center / cover no-repeat`,
            }}
            title={get(item, 'creator.name_surname')}
          />

          <span className={cn('name').mix('p3 p3_theme_light')}>
            {get(item, 'creator.name_surname')}
          </span>

          <span className={cn('location').mix('p3 p3_theme_light')}>{item.place_of_work}</span>

          <time className={cn('date').mix('p3 p3_theme_light')} dateTime={`${moment(item.created_at).format('DD.MM.YYYY')}`}>
            {moment(item.created_at).format('DD.MM.YYYY')}
          </time>
        </div>

        {/*<div className={cn('wrapper-setting')}>*/}
          {/*<span*/}
            {/*className={`${cn('settings')} ${this.state.open ? 'active' : ''}`}*/}
            {/*onClick={() => this.setState({ open: !this.state.open })}*/}
            {/*title={this.state.open ? 'Закрыть' : 'Открыть'}*/}
          {/*>*/}
            {/*<Settings outline className={cn('seting-icon').state({ open: open })} />*/}
          {/*</span>*/}
          {/*{this.state.open && <SettingsMenu item={item} />}*/}
        {/*</div>*/}
      </div>

      // <div className={cn('item')}>
      //   <div className={cn('item-head')}>
      //     <Link className={cn('item-link')} to={`/recruitment/vacancies/${item.id}`}>
      //       {item.name}
      //     </Link>
      //   </div>
      //
      //   <div className={cn('item-foot').mix('clearfix')}>
      //     <span className={cn('item-place')}>{item.place_of_work}</span>
      //
      //     <span className={cn('item-manager')}>
      //       <span className={cn('item-manager-avatar')} />
      //       <div className={cn('item-manager-info')}>
      //         <div className={cn('item-manager-name')} />
      //
      //         <div className={cn('item-manager-role')}>{item.managerRole}</div>
      //       </div>
      //     </span>
      //
      //     <span className={cn('item-user')}>
      //       <img
      //         src={`${item.creator && item.creator.profile && item.creator.profile.photo
      //           ? item.creator.profile.photo.thumb.url
      //           : '/public/avatar.png'}`}
      //         alt=""
      //         className={cn('item-user-avatar')}
      //       />
      //
      //       <div className={cn('item-user-info')}>
      //         <div className={cn('item-user-name')}>
      //           {item.creator && item.creator.profile && item.creator.profile.name}{' '}
      //           {item.creator && item.creator.profile && item.creator.profile.surname}
      //         </div>
      //
      //         <div className={cn('item-user-role')}>{item.userRole}</div>
      //       </div>
      //     </span>
      //
      //     <span className={cn('item-open-time')}>
      //       {`Дата открытия ${moment(item.created_at).format('DD/MM/YYYY')}`}
      //     </span>
      //
      //     <span className={cn('item-close-time')}>
      //       {`Дата закрытия ${moment(item.ends_at).format('DD/MM/YYYY')}`}
      //     </span>
      //   </div>
      // </div>
    )
  }
}
