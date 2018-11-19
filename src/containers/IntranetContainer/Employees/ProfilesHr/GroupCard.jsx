import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Close , Skype, Post, Phone, Arrow, Birthday } from 'components-folder/Icon/'
import PersonnelMovementCollapse from './PersonnelMovementCollapse'
import PersonnelHistory from './PersonnelHistory'
import EmploymentInfo from './EmploymentInfo'


import {
  Settings,
} from 'components-folder/Icon/'

import { v4 } from 'uuid'
import moment from 'moment/moment'
import Loader from "components-folder/Loader";


const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/groups/groups.css')
}
moment.locale('ru')

export default class GroupCard extends Component {
  state = {
    open: false,
    employmentOpen: false,
  }

  componentDidMount(){
  }

  handlerShowCard = () => {
    const { dispatch } = this.props
    dispatch({type: 'TOGGLE_SHOW_CARD_PROFILE', payload: false})
  }


  render() {
    const { loaders, current } = this.props
    return (
      <div className={cn('card-wrapper')}>
        <div className={cn('card-func-elements')}>
          <span
            onClick={() => this.handlerShowCard()}
            className={cn('card-closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('card-closed-thin-icon')} />
          </span>
        </div>
        {
          loaders.getProfileHr ? (
            <Loader/>
          ) : ( [
            <div className={cn('card-header')} key="global-info">
              <div className={cn('card-employee-avatar')} style={{
                background: `url('${current.photo && current.photo.url}') center center / cover no-repeat`,
              }}>
              </div>
              <div className={cn('card-employee-data')}>
                <h2>
                <Link to={`/employees/${current.id}`} className={cn('card-employee-name').mix('link_theme_light_first')}>
                  {current.full_name}
                </Link>
                </h2>
                <div className={cn('card-employee-info')}>
                  <div className={cn('card-employee-item').mix('groups__card-employee-mr-11')}>
                    <div className={cn('card-employee-wrap')}>
                      <Birthday className={cn('card-employee-icon-cake').mix('groups__card-employee-icon')} />
                      <time className={('p2 p2_theme_light_first indent-reset')} dateTime={current.birthday}>
                        {current.birthday && moment(current.birthday).format('DD.MM.YYYY')}
                      </time>
                      {/*can be used "p" instead of "time"*/}
                      </div>
                  </div>
                  <div className={cn('card-employee-item').mix('groups__card-employee-mr-11')}>
                    <div className={cn('card-employee-wrap')}>
                      <Phone className={cn('card-employee-icon-phone').mix('groups__card-employee-icon')} />
                      <a className={('link link_theme_light_first link_pseudo')}>
                        { current.phone }
                      </a>
                    </div>
                  </div>
                  <div className={cn('card-employee-item')}>
                    <div className={cn('card-employee-wrap')}>
                      <Post className={cn('card-employee-icon-email').mix('groups__card-employee-icon')} />
                      <a className={('link link_theme_light_first link_pseudo')} href={'mailto:kleonteva@phoenixit.ru'}>
                      { current.email_address }
                      </a>
                    </div>
                  </div>
                  <div className={cn('card-employee-item')}>
                    <div className={cn('card-employee-wrap')}>
                      <Skype className={cn('card-employee-icon-skype').mix('groups__card-employee-icon')} />
                      <a className={('link link_theme_light_first link_pseudo')}>{current.skype}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>,

            <div className={cn('card-collapse-elem')} key="description">
              <EmploymentInfo { ...this.props }/>
              <PersonnelMovementCollapse { ...this.props }/>
              <PersonnelHistory { ...this.props }/>
            </div>
          ] )
        }
      </div>
    )
  }
}
