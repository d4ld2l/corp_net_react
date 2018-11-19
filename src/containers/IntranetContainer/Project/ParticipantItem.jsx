import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import compose from 'ramda/src/compose'
import { v4 } from 'uuid'

import { PARTICIPANTS_DATA, PARTICIPANTS_TABS } from './data'

import onClickOutside from 'react-onclickoutside'
import { Field, reduxForm } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'
import { deleteParticipantFromProject, repairParticipantInProject } from '../../../redux/actions/profilesProjectActions'

import {
  Loupe,
  Settings,
  Arrow,
  Copy,
  Close,
  Attention,
  Phone,
  Skype,
  Post,
  Planet,
} from 'components-folder/Icon/'
const cn = require('bem-cn')('participants')
if (process.env.BROWSER) {
  require('./style.css')
}

class SettingsMenu extends Component {
  state = {
    open: false,
  }

  handleClickOutside(evt) {
    this.setState({open: false})
  }

  render() {
    const {participant, handleClick, show, showNewParticipantCard, showEditParticipantCard, openEditSidebar} = this.props
    const {open} = this.state
    return(
      <div
        className={cn('participant-item-setting').mix(
          cn(
            (show || showNewParticipantCard || showEditParticipantCard) &&
            'participant-item-setting_hide'
          )
        )}
      >
            <span
              className={`${cn('participant-item-settings')}`}
              onClick={(e) => {
                e.stopPropagation()
                this.setState({ open: !open })
              }}
              title={open ? 'Закрыть' : 'Открыть'}
            >
              <Settings outline
                className={cn('participant-item-setting-icon').state({ open: open })}
              />
            </span>
        {open && (
          <div className={cn('participant-item-settings-menu')}>
            <ul className={cn('participant-item-settings-menu-list')}>
              <li
                className={cn('participant-item-settings-menu-list-item')}
                onClick={() => openEditSidebar()}
              >
                <a className={cn('participant-item-settings-menu-list-item-link')}>
                  Редактировать
                </a>
              </li>
              <li className={cn('participant-item-settings-menu-list-item')}>
                <a className={cn('participant-item-settings-menu-list-item-link')} onClick={() => {
                  handleClick()
                  this.setState({open:false})
                }}>
                  { participant.gone_date ? 'Вернуть в проект' : 'Исключить из проекта'}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

var RenderSettingsMenu = onClickOutside(SettingsMenu)


export default class ParticipantItem extends Component {
  state = {
    open: false,
  }

  statusParticipant = gone_date => {
    return (
      <div
        className={cn('status')}
        style={
          gone_date ? { backgroundColor: '#93959a' } : { backgroundColor: '#575b97' }
        }
      >
        <span className={cn('status-label').mix('p4 p4_theme_dark_second')}>{gone_date ? `до ${gone_date}` : 'На проекте'}</span>
      </div>
    )
  }

  async toggleStatusParticipant(){
    const {participant, dispatch, project} = this.props
    let res = {}
    if (participant.gone_date){
      res = await dispatch(repairParticipantInProject(project.id, participant.id))
    } else {
      res = await dispatch(deleteParticipantFromProject(project.id, participant.id))
    }

  }

  render() {
    const { open } = this.state
    const {
      participants,
      setting,
      onClick,
      show,
      showNewParticipantCard,
      showEditParticipantCard,
      participantId,
      participant,
      project,
      user,
    } = this.props

    return (
      <div
        className={cn('participant-item').mix(
          cn(participantId === participants && show && 'participant-item_active')
        )}
        onClick={(e) => {
          if (!e.target.classList.contains('participants__participant-item-setting-icon') && !e.target.classList.contains('participants__participant-item-settings-menu-list-item-link')){
            onClick({ participantId: participants, show: true, showEditParticipantCard: false })
          }}
        }
      >
        <div
          className={cn('participant-item-logo')}
          style={{
            background: `url('${participant && participant.account.photo.url}') center center / cover no-repeat`,
          }}
        />
        <div
          className={cn('participant-item-name').mix(
            cn(
              (show || showNewParticipantCard || showEditParticipantCard) &&
              'participant-item-name_hide'
            )
          )}
        >
          <Link to={`/employees/${participant.account.id}`} className={'link link_theme_light_first'}>
            {participant && participant.account.full_name}
          </Link>
          <p
            className={cn('participant-item-subtitle').mix('p2 p2_theme_light_second indent_reset').mix(
              cn(
                (show || showNewParticipantCard || showEditParticipantCard) &&
                'participant-item-subtitle_max-w'
              )
            )}
          >
            {participant.project_work_periods.length > 0 && participant.project_work_periods.map(({role}) => (role)).join(', ')}
          </p>
        </div>
        {
          participant.account.preferred_phone && (

            <div
              className={cn('participant-item-phone').mix(
                cn(
                  (show || showNewParticipantCard || showEditParticipantCard) &&
                  'participant-item-phone_hide'
                )
              )}
            >
              <Phone className={cn('phone-icon')} />{' '}
              <Link to={`tel:${participant && participant.account.preferred_phone && participant.account.preferred_phone.number}`} className={cn('participant-item-phone-name').mix('link link_theme_light_first indent_reset')}>
                {participant && participant.account.preferred_phone && participant.account.preferred_phone.number}
              </Link>
            </div>

          )
        }

        <p
          className={cn('participant-item-city').mix('p1 p1_theme_light_first').mix(
            cn(
              (show || showNewParticipantCard || showEditParticipantCard) &&
              'participant-item-city_hide'
            )
          )}
        >
          {participant && participant.account.city}
        </p>
        <span
          className={cn(
            (show || showNewParticipantCard || showEditParticipantCard) &&
            'participant-item-phone_hide'
          )}
        >
          {this.statusParticipant(participant && participant.gone_date)}
        </span>
        {(setting && (user.id === participant.account_id || project.manager_id === user.id ||  user.roles.find(({name}) => name === 'admin'))) ? <RenderSettingsMenu show
                                        showNewParticipantCard
                                        showEditParticipantCard
                                        handleClick={() => this.toggleStatusParticipant()}
                                        {...this.props}/> : <div className={cn('participant-item-setting-fake')}></div>}
        <div
          className={cn('participant-item-open-sidebar')}
          title={'Раскрыть карточку группы рассылки'}
          onClick={() =>
            onClick({ participantId: participants, show: true, showEditParticipantCard: false })}
        >
          <Arrow
            className={cn('participant-item-arrow-icon').mix(
              cn(participantId === participants && show && 'participant-item-arrow-icon_active')
            )}
          />
        </div>
      </div>
    )
  }

  setCandidate(participantId) {
    this.props.setCandidate(participantId)
  }
}
