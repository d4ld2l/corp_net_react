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
import {
  getProfilesProject, toggleTabProfilesProject, getProfilesProjectPagination,
  getProfileProject
} from 'redux-folder/actions/profilesProjectActions'
import ParticipantItem from './ParticipantItem'
import ParticipantCard from './ParticipantCard'
import NewParticipant from './NewParticipant'

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
import Loader from "components-folder/Loader";
import {getProjectsDataPagination} from "redux-folder/actions/projectsDataActions";
import scrollToComponent from "components-folder/ScrollToComponent";
import {toastr} from "react-redux-toastr";
import ReactDOM from "react-dom";
const cn = require('bem-cn')('participants')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class ParticipantsWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      participants: PARTICIPANTS_DATA,
      showParticipantCard: props.defaultOpen,
      showNewParticipant: props.defaultOpen,
      showEditParticipant: props.defaultOpen,
      participantId: null,
      profileProjectId: 0,
    }
  }

  componentDidMount() {
    this.participantsBlock.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.participantsBlock.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { dispatch, project, profilesProject: { scroll, page }, loaders } = this.props
    if (scroll && !loaders.profilesProject){
      const el = this.participantsBlock
      const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop
      if (scrollBottom < 900){
        dispatch(getProfilesProjectPagination(project.id, page))
      }
    }
  }

  scrollToTop = () => {
    scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('participants_block')[0], { offset: -250, align: 'top', duration: 1000})
  }

  render() {
    const {
      showParticipantCard,
      showNewParticipant,
      showEditParticipant,
      participants,
      participantId,
      profileProjectId,
    } = this.state
    const { disabled, profilesProject: {data}, loaders, project, user } = this.props
    return (
      <div className={cn('wrapper')}>
        <div
          className={cn('participants-wrapper')}
          style={{
            width:
              showParticipantCard || showNewParticipant || showEditParticipant ? '470px' : '100%',
          }}
        >
          {
            (!project.account_projects.find(({account_id}) => account_id === user.id) || project.manager_id === user.id ||  user.roles.find(({name}) => name === 'admin')) &&
            <BtnNewParticipant
              disabled={(disabled || showNewParticipant)}
              onClick={this.handlerNewParticipant}
              showNewParticipantCard={showNewParticipant}
            />
          }
          <div id="participants" className='participants_block global-scroll global-scroll_theme_light' ref={node => this.participantsBlock = node}>
            { loaders.profilesProjectTab ? <Loader/> : (
                <div>
                  {data.map(it => (
                    <ParticipantItem
                      key={it.id}
                      participants={it}
                      setting={true}
                      openEditSidebar={() => this.handlerEditParticipantCard(it.id)}
                      onClick={() => this.handlerParticipantCard(it.id)}
                      show={showParticipantCard}
                      showNewParticipantCard={showNewParticipant}
                      showEditParticipantCard={showEditParticipant}
                      participantId={it.id}
                      participant={it}
                      {...this.props}
                    />
                  ))}
                  {loaders.profilesProject && <Loader/>}
                </div>
              )
            }
          </div>
        </div>
        {showParticipantCard && (
          <ParticipantCard
            closeSidebar={() => this.setState({ showParticipantCard: false })}
            openEditSidebar={() => this.setState({ showParticipantCard: false, showEditParticipant: true })}
            participantId={participantId}
            participants={participantId}
            participant={data[9]}
            profileProjectId={profileProjectId}
            key={profileProjectId}
            {...this.props}
          />
        )}
        {(showNewParticipant || showEditParticipant) && (
          <NewParticipant
            closeSidebar={() =>
              this.setState({ showNewParticipant: false, showEditParticipant: false })}
            showSidebar={(id) => this.handlerParticipantCard(id)}
            showEditParticipantCard={showEditParticipant}
            edit={showEditParticipant}
            profileProjectId={profileProjectId}
            { ...this.props }
          />
        )}
      </div>
    )
  }

  handlerParticipantCard = (participantId) => {
    this.setState({
      participantId,
      showParticipantCard: true,
      showNewParticipant: false,
      showEditParticipant: false,
      profileProjectId: participantId,
    })
    this.scrollToTop()
  }

  handlerEditParticipantCard = (participantId) => {
    const {project, dispatch} = this.props
    Promise.all([
      dispatch(getProfileProject(project.id, participantId))
    ]).then(() => {
      this.setState({
        participantId,
        showParticipantCard: false,
        showNewParticipant: false,
        showEditParticipant: true,
        profileProjectId: participantId,
      })
      this.scrollToTop()
    })
  }


  handlerNewParticipant = ({ showNewParticipantCard }) => {
    this.setState({
      showNewParticipant: showNewParticipantCard,
      showParticipantCard: false,
      showEditParticipant: false,
    })
  }
}

class BtnNewParticipant extends Component {
  render() {
    const { onClick } = this.props

    return (
      <div className={cn('btn-new-participant-wrapper')}>
        <button
          className={'btn btn-primary btn-small'}
          title={'Добавить нового участника в проект'}
          onClick={() => onClick({ showNewParticipantCard: true })}
        >
          Добавить участника
        </button>
      </div>
    )
  }
}

class ParticipantItemNew extends Component {
  render() {
    return (
      <div
        className={cn('participant-item').mix(
          cn('participant-item_sb').mix(cn('participant-item_active'))
        )}
      >
        <div
          className={cn('participant-item-logo')}
          style={{
            background: `url('') center center / cover no-repeat`,
          }}
        />
        <div className={cn('participant-item-name').mix(cn('participant-item-name_hide'))}>
          <p className={cn('participant-item-title')}>
            Новая группа <sup className={cn('participant-item-count-employee')}>0</sup>
          </p>
          <p className={cn('participant-item-subtitle').mix(cn('participant-item-subtitle_max-w'))}>
            Описание группы
          </p>
        </div>
        <div className={cn('participant-item-open-sidebar')}>
          <Arrow
            className={cn('participant-item-arrow-icon').mix(
              cn('participant-item-arrow-icon_active')
            )}
          />
        </div>
      </div>
    )
  }
}

class ParticipantCard1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showProfessionalQuality: true,
      showProfessionalQualitySkill: props.defaultOpen,
      showProfessionalQualityWork: props.defaultOpen,
    }
  }

  render() {
    const {
      showProfessionalQuality,
      showProfessionalQualitySkill,
      showProfessionalQualityWork,
    } = this.state
    const { participants, closeSidebar } = this.props
    return (
      <div className={cn('participant-card-wrapper')}>
        <div className={cn('participant-card-func-elements')}>
          <span
            className={cn('participant-card-copy-icon-wrapper').mix('cur')}
            title={'Копировать карточку группы'}
          >
            <Copy outline className={cn('participant-card-copy-icon')} />
          </span>
          <span
            onClick={closeSidebar}
            className={cn('participant-card-closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('participant-card-closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('participant-card-header')}>
          <div>
            <div
              className={cn('participant-card-header-photo')}
              style={{ background: `url(${participants.logo}) center center / cover no-repeat` }}
            />
          </div>
          <div>
            <Link className={cn('participant-card-header-link')} to={`/`}>
              <h2>{participants.title}</h2>
            </Link>
            <p className={cn('participant-card-header-age-city')}>
              {participants.age} лет, {participants.city}
            </p>
            <p className={cn('participant-card-header-position')}>{participants.subtitle}</p>
            {/*<Status />*/}
            <div className={cn('participant-card-header-communication-method-wrapper')}>
              <div className={cn('participant-card-header-communication-method')}>
                <div className={cn('participant-item-phone')}>
                  <Phone className={cn('phone-icon')} />
                  <Link
                    to={`tel:${participants.phone}`}
                    className={cn('participant-item-phone-name')}
                  >
                    {participants.phone}
                  </Link>
                </div>
                <div className={cn('participant-item-skype')}>
                  <Skype className={cn('participant-item-skype-icon')} />
                  <Link
                    to={`tel:${participants.phone}`}
                    className={cn('participant-item-phone-name')}
                  >
                    {participants.phone}
                  </Link>
                </div>
              </div>
              <div className={cn('participant-card-header-communication-method')}>
                <div className={cn('participant-item-post')}>
                  <Post className={cn('participant-item-post-icon')} />
                  <Link
                    to={`mailto:${participants.post}`}
                    className={cn('participant-item-phone-name')}
                  >
                    {participants.post}
                  </Link>
                </div>
                <div className={cn('participant-item-world')}>
                  <Planet className={cn('participant-item-world-icon')} />
                  <Link to={`${participants.world}`} className={cn('participant-item-phone-name')}>
                    {participants.world}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('participant-card-participants')}>
          {showProfessionalQuality && (
            <div className={cn('professional-quality')}>
              {participants.skills.length > 0 && (
                <div key={v4()}>
                  <p className={cn('professional-quality-label')}>Навыки</p>
                  <div className={cn('professional-quality-wrapper')}>
                    <div
                      className={cn('professional-quality-skills')}
                      onClick={this.handlerProfessionalQualitySkill}
                      title={'Раскрыть навыки'}
                    >
                      <div>
                        {participants.skills.map(it => (
                          <span className={cn('professional-quality-skill')}>
                            {it.name} • {it.count_proven}
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
              {participants.work.length > 0 && (
                <div>
                  <p className={cn('professional-quality-label')}>Опыт работы</p>
                  <div className={cn('professional-quality-wrapper')}>
                    {participants.work.map(it => (
                      <div
                        key={v4()}
                        className={cn('professional-quality-work')}
                        title={'Раскрыть опыт работы'}
                        onClick={this.handlerProfessionalQualityWork}
                      >
                        <div>
                          <p className={cn('professional-quality-work-title')}>
                            {it.start_date} - {it.end_date}
                          </p>
                          <p className={cn('professional-quality-work-position')}>{it.position}</p>
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
            </div>
          )}
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

  handlerProfessionalQualityWork = () => {
    this.setState({
      showProfessionalQuality: false,
      showProfessionalQualitySkill: false,
      showProfessionalQualityWork: true,
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

class NewParticipant1 extends Component {
  state = {
    open: false,
  }

  render() {
    const { open } = this.state
    const { closeSidebar, showEditParticipantCard } = this.props

    return (
      <div className={cn('participant-card-wrapper').mix(cn('participant-card-wrapper_new'))}>
        <h1>asdfsf</h1>
        {/*<div className={cn('participant-card-head-wrapper')}>*/}
          {/*<h2>{showEditParticipantCard ? 'Редактирование группы' : 'Новая группа'}</h2>*/}
          {/*<div*/}
            {/*className={cn('participant-card-func-elements').mix(*/}
              {/*cn('participant-card-func-elements_new')*/}
            {/*)}*/}
          {/*>*/}
            {/*{showEditParticipantCard && (*/}
              {/*<div className={cn('participant-item-setting')}>*/}
                {/*<span*/}
                  {/*className={`${cn('participant-item-settings')}`}*/}
                  {/*onClick={() => this.setState({ open: !open })}*/}
                  {/*title={open ? 'Закрыть' : 'Открыть'}*/}
                {/*>*/}
                  {/*<Settings outline*/}
                    {/*className={cn('participant-item-setting-icon').state({ open: open })}*/}
                  {/*/>*/}
                {/*</span>*/}
                {/*{open && (*/}
                  {/*<div className={cn('participant-item-settings-menu')}>*/}
                    {/*<ul className={cn('participant-item-settings-menu-list')}>*/}
                      {/*<li className={cn('participant-item-settings-menu-list-item')}>*/}
                        {/*<a className={cn('participant-item-settings-menu-list-item-link')}>*/}
                          {/*Редактировать*/}
                        {/*</a>*/}
                      {/*</li>*/}
                    {/*</ul>*/}
                  {/*</div>*/}
                {/*)}*/}
              {/*</div>*/}
            {/*)}*/}
            {/*<span*/}
              {/*onClick={closeSidebar}*/}
              {/*className={cn('participant-card-closed-thin-icon-wrapper').mix('cur')}*/}
              {/*title={'Закрыть карточку группы'}*/}
            {/*>*/}
              {/*<Close className={cn('participant-card-closed-thin-icon')} />*/}
            {/*</span>*/}
          {/*</div>*/}
        {/*</div>*/}

        {/*<div className="required">*/}
          {/*<Field*/}
            {/*component={BootstrapInput}*/}
            {/*name="name_participant"*/}
            {/*type="text"*/}
            {/*label="Название группы"*/}
          {/*/>*/}
        {/*</div>*/}
        {/*<div className="required">*/}
          {/*<Field*/}
            {/*component={BootstrapTextarea}*/}
            {/*name="description_participant"*/}
            {/*type="text"*/}
            {/*label="Описание"*/}
          {/*/>*/}
          {/*<p className={cn('info-msg')}>Вы можите указать особенность группы</p>*/}
        {/*</div>*/}
        {/*<Field*/}
          {/*name="photo"*/}
          {/*component={ReduxFormDropzoneAvatarCandidate}*/}
          {/*style={{}}*/}
          {/*removable*/}
          {/*multiple={false}*/}
          {/*// cleanField={() => dispatch(change('Container', 'photo', ''))}*/}
          {/*label="Загрузить аватар"*/}
          {/*className={cn('dropzone')*/}
            {/*.mix('cur')*/}
            {/*.toString()}*/}
          {/*icon={true}*/}
        {/*/>*/}

        {/*<div>*/}
          {/*<button className={'btn btn-primary btn-margin-right '}>Сохранить</button>*/}
          {/*<button className={'btn btn-primary btn-outline'} onClick={closeSidebar}>*/}
            {/*Отменить*/}
          {/*</button>*/}
        {/*</div>*/}
      </div>
    )
  }
}
