import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import compose from 'ramda/src/compose'
import { v4 } from 'uuid'

import { PARTICIPANTS_DATA, PARTICIPANTS_TABS } from './data'

import { Field, reduxForm } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'
import { getProfileProject, toggleTabProfilesProject, getProfilesProjectPagination } from '../../../redux/actions/profilesProjectActions'
import ParticipantItem from './ParticipantItem'
import EmployeeCollapseSkillElem from '../Employee/EmployeeCollapseSkillElem'


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
  Pencil,
} from 'components-folder/Icon/'
import Loader from "components-folder/Loader";
import {getProjectsDataPagination} from "../../../redux/actions/projectsDataActions";
const cn = require('bem-cn')('participants')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class ParticipantCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showProfessionalQuality: true,
      showProfessionalQualitySkill: props.defaultOpen,
      showProfessionalQualityWork: props.defaultOpen,
    }
  }

  componentDidMount(){
    const { dispatch, project, profileProjectId } = this.props
    dispatch(getProfileProject(project.id, profileProjectId))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, project, profileProjectId } = this.props
    if (profileProjectId !== nextProps.profileProjectId){
      dispatch(getProfileProject(project.id, nextProps.profileProjectId))
    }
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
        <Attention
          className={cn('status-attention-icon')}
          style={gone_date ? { color: '#93959a' } : { color: '#575b97' }}
        />
      </div>
    )
  }


  render() {
    const {
      showProfessionalQuality,
      showProfessionalQualitySkill,
      showProfessionalQualityWork,
      showProfessionalQualityWorkId,
    } = this.state
    const { participants,
      closeSidebar,
      participant,
      loaders,
      currentProfileProject,
      currentProfileProject: {account},
      openEditSidebar,
      project,
      enabledComponents,
      user} = this.props
    if (loaders.profileProject){
      return (
        <div className={cn('participant-card-wrapper')}>
          <Loader/>
        </div>
        )
    }
    return (
      <div className={cn('participant-card-wrapper')}>

        <div className={cn('participant-card-func-elements')}>
          {/*<span*/}
            {/*className={cn('participant-card-copy-icon-wrapper').mix('cur')}*/}
            {/*title={'Копировать карточку группы'}*/}
          {/*>*/}
            {/*<Copy outline className={cn('participant-card-copy-icon')} />*/}
          {/*</span>*/}
          {
            (user.id === account.id || project.manager_id === user.id ||  user.roles.find(({name}) => name === 'admin')) &&
            (
              <span
                className={cn('participant-card-copy-icon-wrapper').mix('cur')}
                title={'Редактировать карточку группы'}
                onClick={openEditSidebar}
              >
                <Pencil outline={30} className={cn('participant-card-copy-icon')} />
              </span>
            )
          }
          <span
            onClick={closeSidebar}
            className={cn('participant-card-closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('participant-card-closed-thin-icon')} />
          </span>
    </div>
        <div className={cn('b-wrapper').mix('global-scroll global-scroll_theme_light')}>
          <div className={cn('participant-card-header')}>
            <div>
              <div
                className={cn('participant-card-header-photo')}
                style={{ background: `url(${account.photo.url}) center center / cover no-repeat` }}
              />
            </div>
            <div>
              <Link className={cn('participant-card-header-link').mix('link link_theme_light_first')} to={`/employees/${account.id}`}>
                <h2>{account.full_name}</h2>
              </Link>
              <p className={cn('participant-card-header-age-city').mix('p2 p2_theme_light_second')}>
                {account.city}
              </p>
              <p className={'p1 p1_theme_light_first indent_20'}>{account.position_name}</p>
              {this.statusParticipant(currentProfileProject.gone_date)}
              <div className={cn('participant-card-header-communication-method-wrapper')}>
                <div className={cn('participant-card-header-communication-method')}>
                  {
                    account.preferred_phone && (
                      <div className={cn('participant-item-phone')}>
                        <Phone className={cn('phone-icon')} />
                        <Link
                          to={`tel:${account.preferred_phone.number}`}
                          className={'link link_theme_light_first'}
                          target="_blank"
                        >
                          {account.preferred_phone.number}
                        </Link>
                      </div>
                    )
                  }
                  {
                    account.skype && (
                      <div className={cn('participant-item-skype')}>
                        <Skype className={cn('participant-item-skype-icon')} />
                        <Link
                          to={`tel:${account.skype}`}
                          className={'link link_theme_light_first'}
                          target="_blank"
                          title={account.skype}
                        >
                          {account.skype.length > 24 ? `${account.skype.substr(0, 23)}...` : account.skype}
                        </Link>
                      </div>
                    )
                  }
                </div>
                <div className={cn('participant-card-header-communication-method')}>
                  {
                    account.preferred_email && (
                      <div className={cn('participant-item-post')}>
                        <Post className={cn('participant-item-post-icon')} />
                        <Link
                          to={`mailto:${account.preferred_email.email}`}
                          className={'link link_theme_light_first'}
                          target="_blank"
                          title={account.preferred_email.email}
                        >
                          {account.preferred_email.email > 24 ? `${account.preferred_email.email.substr(0, 23)}...` : account.preferred_email.email}
                        </Link>
                      </div>
                    )
                  }
                  {
                    account.social_urls.length > 0 && (
                      <div className={cn('participant-item-world')}>
                        <Planet className={cn('participant-item-world-icon')} />
                        <Link to={`${account.social_urls[0]}`}
                              className={'link link_theme_light_first'}
                              target="_blank"
                              title={account.social_urls[0]}
                        >
                          {account.social_urls[0].length > 22 ? `${account.social_urls[0].substr(0, 22)}...` : account.social_urls[0]}
                        </Link>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={cn('participant-card-participants')}>
            {showProfessionalQuality && enabledComponents.shr_skills && (
              <div className={cn('professional-quality')}>
                {account.account_skills && account.account_skills.length > 0 && (
                  <div key="skills">
                    <p className={cn('professional-quality-label').mix('p1 p1_theme_light_first fw_500')}>Навыки</p>
                    <div className={cn('professional-quality-wrapper')}>
                      <div
                        className={cn('professional-quality-skills')}
                        onClick={this.handlerProfessionalQualitySkill}
                        title={'Раскрыть навыки'}
                      >
                        <div>
                          {account.account_skills.map(it => (
                            <span key={it.id} className={cn('professional-quality-skill')}>
                            {it.skill.name} • {it.skill_confirmations_count}
                          </span>
                          ))}
                        </div>
                        <div className={cn('participant-item-open-sidebar')}>
                          <Arrow className={cn('participant-item-arrow-icon')} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentProfileProject.project_work_periods.length > 0 && (
                  <div>
                    <p className={cn('professional-quality-label').mix('p1 p1_theme_light_first fw_500')}>Опыт работы</p>
                    <div className={cn('professional-quality-wrapper')}>
                      {currentProfileProject.project_work_periods.map((it, index) => (
                        <div
                          key={index}
                          className={cn('professional-quality-work')}
                          title={'Раскрыть опыт работы'}
                          onClick={() => this.handlerProfessionalQualityWork(it)}
                        >
                          <div>
                            {
                              it.begin_date &&
                              <p className={cn('professional-quality-work-title')}>
                                {it.begin_date} - {it.end_date ? it.end_date : 'по наст. вр.'}
                              </p>
                            }

                            <p className={cn('professional-quality-work-position')}>{it.role}</p>
                          </div>
                          <div className={cn('participant-item-open-sidebar')}>
                            <Arrow className={cn('participant-item-arrow-icon')} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showProfessionalQualitySkill && (
              <div>
                <div
                  className={cn('professional-quality-back-wrapper')}
                  onClick={this.handlerProfessionalQualityBack}
                >
                  <div className={cn('professional-quality-back')}>
                    <Arrow className={cn('participant-item-arrow-icon')} />
                  </div>
                  <p className={cn('professional-quality-label')}>Назад</p>
                </div>
                {account.account_skills.length > 0  && account.account_skills.map((skill, index) => (
                  <EmployeeCollapseSkillElem
                    key={index}
                    name_skill={skill.skill.name}
                    count_proven_skill={skill.skill_confirmations_count}
                    arr_user={skill.skill_confirmations.map(({account}) => account)}
                    current_user={account.id === user.id}
                    user_id={account.id}
                    confirm = {!((skill.skill_confirmations.map((it)=> (it.account.id))).indexOf(user.id) < 0)}
                    id={skill.id}/>
                ))}

              </div>
            )}
            {showProfessionalQualityWork && (
              <div>
                <div
                  className={cn('professional-quality-back-wrapper')}
                  onClick={this.handlerProfessionalQualityBack}
                >
                  <div className={cn('professional-quality-back')}>
                    <Arrow className={cn('participant-item-arrow-icon')} />
                  </div>
                  <p className={cn('professional-quality-label')}>Назад</p>
                </div>
                {
                  showProfessionalQualityWorkId && (
                    <div>

                      <div
                        className={cn('professional-quality-show')}
                      >
                        <div>
                          {
                            showProfessionalQualityWorkId.begin_date &&
                            <p className={cn('professional-quality-work-title')}>
                              {showProfessionalQualityWorkId.begin_date} - {showProfessionalQualityWorkId.end_date ? showProfessionalQualityWorkId.end_date : 'по наст. вр.'}
                            </p>
                          }

                          <p className={cn('professional-quality-work-position')}>{showProfessionalQualityWorkId.role}</p>
                        </div>
                      </div>
                      <div>
                        <p className={cn('participant-card-header-position')}>Обязанности:</p>
                        <div>
                          {showProfessionalQualityWorkId.duties}
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  handlerProfessionalQualitySkill = () => {
    this.setState({
      showProfessionalQuality: false,
      showProfessionalQualitySkill: true,
      showProfessionalQualityWork: false,
    })
  }

  handlerProfessionalQualityWork = (index) => {
    this.setState({
      showProfessionalQuality: false,
      showProfessionalQualitySkill: false,
      showProfessionalQualityWork: true,
      showProfessionalQualityWorkId: index,
    })
  }

  handlerProfessionalQualityBack = () => {
    this.setState({
      showProfessionalQuality: true,
      showProfessionalQualitySkill: false,
      showProfessionalQualityWork: false,
    })
  }
}
