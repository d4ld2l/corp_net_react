import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Copy, Close, Trash, Pencil } from 'components-folder/Icon/'

const cn = require('bem-cn')('distribution')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

const validate = values => {
  const errors = {}

  if (!values.name_group) {
    errors.name_group = 'Обязательное поле'
  }

  if (!values.description_group) {
    errors.description_group = 'Обязательное поле'
  }

  return errors
}

class GroupCard extends Component {

  render() {
    const { closeSidebar, handlerCopyGroup, group, setting  } = this.props
    return (
      <div className={cn('group-card-wrapper')}>
        <div className={cn('group-card')}>
          <div
            className={cn('group-item-setting distribution__group-card-func-elements')}
          >
            { setting &&
            [
              <span
                className={cn('group-card-copy-icon-wrapper').mix('cur')}
                title={'Удалить карточку команды'}
                onClick={()=> this.props.deleteGroup(this.props.group)}
                key={0}
              >
                <Trash outline className={cn('group-card-copy-icon')} />
              </span>,

              <span
                className={cn('group-card-copy-icon-wrapper').mix('cur')}
                title={'Редактировать карточку команды'}
                onClick={() => this.props.handlerEditGroup(this.props.group)}
                key={1}
              >
                <Pencil outline className={cn('group-card-copy-icon')} />
              </span>
            ]
            }

            <span
              className={cn('group-card-copy-icon-wrapper').mix('cur')}
              title={'Копировать карточку команды'}
              onClick={() => handlerCopyGroup(group)}
            >
            <Copy outline className={cn('group-card-copy-icon')} />
          </span>
            <span
              onClick={closeSidebar}
              className={cn('group-card-closed-thin-icon-wrapper').mix('cur')}
              title={'Закрыть карточку команды'}
            >
            <Close className={cn('group-card-closed-thin-icon')} />
          </span>
          </div>
          <div className={cn('b-wrapper').mix('global-scroll global-scroll_theme_light')}>
            <div className={cn('group-card-header')}>
              <h2 className={('indent_13')}>{group.name}</h2>
              <p className={cn('group-card-header-autor-date').mix('p3 p3_theme_light')}>
                Лидер — {group.creator.surname} {group.creator.name} {group.creator.middlename}
                <time className={cn('group-card-header-date').mix('p3 p3_theme_light')} dateTime={group.date}>
                  Дата создания — {moment(group.created_at).format('DD.MM.YYYY')}
                </time>
              </p>
              <p className={cn('group-card-header-description').mix('p1 p1_theme_light_first indent-_reset')}>{group.description}</p>
            </div>
            <div className={cn('group-card-participants')}>
              <h3>
                Участники <sup className={cn('group-card-participants-count').mix('p4 p4_theme_light_third')}>{group.account_mailing_lists.length}</sup>
              </h3>
              {
                group.account_mailing_lists.map(({account}, index)=>(
                  <div key={index} className={cn('group-card-participant')}>
                    <div
                      className={cn('group-card-participant-logo')}
                      style={{
                        background: `url('${account.photo.url}') center center / cover no-repeat`,
                      }}
                    />
                    <div>
                      <Link className={cn('group-card-participant-name').mix('link link_theme_light_first link_pseudo indent-reset')} to={`/employees/${account.id}`}>
                        {' '}
                        {account.surname} {account.name} {account.middlename}
                      </Link>
                      <p className={cn('group-card-participant-specialization').mix('p2 p2_theme_light_second indent_reset')}>
                        { account.position_name }
                      </p>
                      <p className={cn('group-card-participant-practice').mix('p2 p2_theme_light_second indent_reset')}>
                        { account.departments_chain && account.departments_chain.map(({name_ru}) => (name_ru)).join(' /') }
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupCard
