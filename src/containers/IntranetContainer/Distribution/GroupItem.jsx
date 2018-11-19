import React, { Component } from 'react'
import moment from 'moment'

import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'
import { getDistribution, deleteDistribution } from '../../../redux/actions/distributionActions'
import onClickOutside from 'react-onclickoutside'


import EmployeeNewGroup from './EmployeeNewGroup'

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

class GroupItem extends Component {
  state = {
    open: false,
  }

  handleClickOutside = () => {
    this.setState({open: false})
  }

  deleteGroup = () => {
    if (confirm('Вы уверены?')) {
      const { dispatch, group } = this.props
      dispatch(deleteDistribution(group.id))
    }
  }

  render() {
    const { open } = this.state
    const {
      group,
      director,
      setting,
      onClick,
      show,
      showNewGroupCard,
      showEditGroupCard,
      groupId,
      handlerEditGroup,
    } = this.props

    return (
      <div
        onClick={(e) => {
          if (!e.target.classList.contains('distribution__group-item-setting-icon') && !e.target.classList.contains('distribution__group-item-settings-menu-list-item-link')){
            onClick({ groupId: group, show: true, showEditGroupCard: false })}
          }
        }
        className={cn('group-item').mix(
          cn(director ? 'group-item_fs' : 'group-item_sb').mix(
            cn(groupId === group && show && 'group-item_active')
          )
        )}
      >
        <div
          className={cn('group-item-logo')}
          style={{
            background: `url('${group.logo}') center center / cover no-repeat`,
          }}
        />
        <div
          className={cn(director ? 'group-item-name_min-max' : 'group-item-name').mix(
            cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-name_hide')
          )}
        >
          <p className={cn('group-item-title').mix('p1 p1_theme_light_first indent-reset')}>
            {group.name}{' '}
            <sup className={cn('group-item-count-employee').mix('p4 p4_theme_light_third')}>{group.account_mailing_lists.length}</sup>
          </p>
          <p
            className={cn('group-item-subtitle').mix('p2 p2_theme_light_second indent-reset').mix(
              cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-subtitle_max-w')
            )}
          >
            {group.description}
          </p>
        </div>
        <div
          className={cn('group-item-director').mix(
            cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-director_hide')
          )}
        >
          <p className={cn('group-item-director-name').mix('p1 p1_theme_light_first indent-reset')}>{group.creator.surname} {group.creator.name} {group.creator.middlename}</p>
        </div>
        <time
          className={cn(director ? 'group-item-time_padding-right-left' : 'group-item-time').mix('p1 p1_theme_light_first').mix(
            cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-time_hide')
          )}
          dateTime={moment(group.created_at).format('DD.MM.YYYY')}
        >
          {moment(group.created_at).format('DD.MM.YYYY')}
        </time>
        {setting && (
          <div
            className={cn('group-item-setting').mix(
              cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-setting_hide')
            )}
          >
            <span
              className={`${cn('group-item-settings')}`}
              onClick={(e) => {
                e.stopPropagation()
                this.setState({ open: !open })
              }}
              title={open ? 'Закрыть' : 'Открыть'}
            >
              <Settings outline className={cn('group-item-setting-icon').state({ open: open })} />
            </span>
            {open && (
              <div className={cn('group-item-settings-menu')}>
                <ul className={cn('group-item-settings-menu-list')}>
                  <li
                    className={cn('group-item-settings-menu-list-item')}
                  >
                    <a className={cn('group-item-settings-menu-list-item-link')} onClick={() => onClick(handlerEditGroup())}>Редактировать</a>
                  </li>
                  <li
                    className={cn('group-item-settings-menu-list-item')}
                  >
                    <a className={cn('group-item-settings-menu-list-item-link')} onClick={() => this.deleteGroup()}>Удалить</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <div
          className={cn('group-item-open-sidebar')}
          title={'Раскрыть карточку команды'}
        >
          <Arrow
            className={cn('group-item-arrow-icon').mix(
              cn(groupId === group && show && 'group-item-arrow-icon_active')
            )}
          />
        </div>
      </div>
    )
  }

  setCandidate(groupId) {
    this.props.setCandidate(groupId)
  }
}

export default onClickOutside(GroupItem)
