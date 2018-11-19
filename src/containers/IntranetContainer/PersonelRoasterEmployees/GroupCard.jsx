import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Close , Skype, Post, Phone, Arrow } from 'components-folder/Icon/'
import Tabs from './Tabs'
import PersonnelMovementCollapse from './PersonnelMovementCollapse'
import EmploymentInfo from './EmploymentInfo'
import onClickOutside from 'react-onclickoutside'

import {
  Settings,
} from 'components-folder/Icon/'

import { v4 } from 'uuid'
import moment from 'moment/moment'
import { GROUP_DATA } from '../Notifications/data'


const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('./css/groups/groups.css')
}
moment.locale('ru')

export default class GroupCard extends Component {
  state = {
    open: false,
    employmentOpen: false,
  }


  render() {
    const { group, closeSidebar, setting } = this.props
    const { open, employmentOpen } = this.state
    return (
      <div className={cn('card-wrapper')}>
        <div className={cn('card-func-elements')}>
          <span
            className={cn('card-copy-icon-wrapper').mix('cur')}
            onClick={() => this.setState({ open: !open })}
            title={open ? 'Закрыть' : 'Открыть'}
          >
              <Settings
                className={cn('card-setting-icon').state({ open: open })}
              />
            </span>
          {open && (
            <div className={cn('card-setting-menu')}>
              <ul className={cn('card-setting-list')}>
                <li className={cn('card-setting-item')}>
                  <a className={cn('card-setting-link').mix('p2 link link_theme_light_first link_pseudo')}>Редактировать</a>
                </li>
                <li className={cn('card-setting-item')}>
                  <a className={cn('card-setting-link').mix('p2 link link_theme_light_first link_pseudo')}>Добавить</a>
                </li>
                <li className={cn('card-setting-item')}>
                  <a className={cn('card-setting-link').mix('p2 link link_theme_light_first link_pseudo')}>Удалить</a>
                </li>
              </ul>
            </div>
          )}
          <span
            onClick={closeSidebar}
            className={cn('card-closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('card-closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('card-header')}>
          <div className={cn('card-employee-avatar')} style={{
            background: `url('${group.logo ? group.logo : '/public/avatar.png'}') center center / cover no-repeat`,
          }}>
          </div>
          <div className={cn('card-employee-data')}>
            <h2>
              <a className={cn('card-employee-name').mix('link_theme_light_first')}>{group.name}</a>
            </h2>
            <div className={cn('card-employee-info')}>
              <div className={cn('card-employee-item').mix('groups__card-employee-mr-11')}>
                <div className={cn('card-employee-wrap')}>
                  <Birthday className={cn('card-employee-icon-cake').mix('groups__card-employee-icon')} />
                  <time className={('p2 p2_theme_light_first indent-reset')} dateTime={group.date}>
                    {group.date}
                  </time>
                </div>
              </div>
              <div className={cn('card-employee-item').mix('groups__card-employee-mr-11')}>
                <div className={cn('card-employee-wrap')}>
                  <Phone className={cn('card-employee-icon-phone').mix('groups__card-employee-icon')} />
                  <a className={('link link_theme_light_first link_pseudo')}>{group.phone}</a>
                </div>
              </div>
              <div className={cn('card-employee-item')}>
                <div className={cn('card-employee-wrap')}>
                  <Post className={cn('card-employee-icon-email').mix('groups__card-employee-icon')} />
                  <a className={('link link_theme_light_first link_pseudo')} href={'mailto:kleonteva@phoenixit.ru'}>{group.email}</a>
                </div>
              </div>
              <div className={cn('card-employee-item')}>
                <div className={cn('card-employee-wrap')}>
                  <Skype className={cn('card-employee-icon-skype').mix('groups__card-employee-icon')} />
                  <a className={('link link_theme_light_first link_pseudo')}>{group.skype}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('card-collapse-elem')}>
          <EmploymentInfo />
          <PersonnelMovementCollapse />
        </div>
      </div>
    )
  }
}
