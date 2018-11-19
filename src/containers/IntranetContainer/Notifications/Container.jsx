import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import compose from 'ramda/src/compose'

import { GROUP_DATA } from './data'
import Filtered from './Filtered'
import Filter from './Filter'
import BtnMarkAllRead from './BtnMarkAllRead'
import { Row, Col } from 'react-bootstrap'
import { change, Field, reduxForm } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'

import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'

const cn = require('bem-cn')('notifications')
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

const connector = compose(
  reduxForm({
    form: 'Container',
    validate,
  })
)

class Container extends Component {
  render() {
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Helmet>
              <title>Уведомления</title>
            </Helmet>
            <Breadcrumb />
            <Header />
            <Tabs />
          </Col>
        </Row>
      </div>
    )
  }
}

const Breadcrumb = () => (
  <ol className="breadcrumb">
    <li>
      <Link to="/">Главная</Link>
    </li>
    <Arrow dir={'right'} className="chevron-icon" />
    <li className="active">
      <span>Уведомления</span>
    </li>
  </ol>
)

const Header = () => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>Уведомления</h1>
  </div>
)



class Tabs extends Component {
  state = {
    currentTab: 'all',
    groups: GROUP_DATA,
  }

  renderAll = () => <GroupsWrapper />

  renderWork = () => <GroupsWrapper disabled={true} work={true} />

  renderSocial = () => <GroupsWrapper disabled={true} social={true} />

  renderCommon = () => <GroupsWrapper disabled={true} common={true} />

  render() {
    const { currentTab, groups } = this.state
    return (
      <div>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
            <li
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ current: currentTab === 'all' })}
              onClick={() => this.setState({ currentTab: 'all' })}
            >
              Все
              {/*<sup className={cn('count')}>{groups.length}</sup>*/}
            </li>
            <li
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ current: currentTab === 'work' })}
              onClick={() => this.setState({ currentTab: 'work' })}
            >
              Рабочие
              {/*<sup className={cn('count')}>{groups.length}</sup>*/}
            </li>
            <li
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ current: currentTab === 'social' })}
              onClick={() => this.setState({ currentTab: 'social' })}
            >
              Социальные
              {/*<sup className={cn('count')}>{groups.length}</sup>*/}
            </li>
            <li
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ current: currentTab === 'common' })}
              onClick={() => this.setState({ currentTab: 'common' })}
            >
              Общие
              {/*<sup className={cn('count')}>{groups.length}</sup>*/}
            </li>
          </ul>
          {/*<Search />*/}
          <Filtered />
          <Filter />

        </div>

        {currentTab === 'all' && this.renderAll()}
        {currentTab === 'work' && this.renderWork()}
        {currentTab === 'social' && this.renderSocial()}
        {currentTab === 'common' && this.renderCommon()}
      </div>
    )
  }
}

class GroupsWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: GROUP_DATA,
      showGroupCard: props.defaultOpen,
      showNewGroup: props.defaultOpen,
      showEditGroup: props.defaultOpen,
      groupId: null,
    }
  }

  render() {
    const { showGroupCard, showNewGroup, showEditGroup, groups, groupId } = this.state
    const { disabled, available_to_me } = this.props
    return (
      <div className={cn('wrapper')}>
        <div
          className={cn('groups-wrapper')}
          style={{ width: showGroupCard || showNewGroup || showEditGroup ? '470px' : '100%' }}
        >
          <BtnMarkAllRead />
          {showNewGroup && <GroupItemNew />}
          {available_to_me
            ? groups.map(it => (
              <GroupItem
                key={Math.random()}
                group={it}
                director={true}
                setting={false}
                onClick={this.handlerGroupCard}
                show={showGroupCard}
                showNewGroupCard={showNewGroup}
                showEditGroupCard={showEditGroup}
                groupId={groupId}
              />
            ))
            : groups.map(it => (
              <GroupItem
                key={Math.random()}
                group={it}
                read={true}
                link_title={true}
                link_connecting_text={true}
                link_concluding={true}
                director={false}
                setting={true}
                onClick={this.handlerGroupCard}
                show={showGroupCard}
                showNewGroupCard={showNewGroup}
                showEditGroupCard={showEditGroup}
                groupId={groupId}
              />
            ))}
        </div>
        {showGroupCard && (
          <GroupCard
            closeSidebar={() => this.setState({ showGroupCard: false })}
            groupId={groupId}
            group={groupId}
          />
        )}
        {(showNewGroup || showEditGroup) && (
          <NewGroup
            closeSidebar={() => this.setState({ showNewGroup: false, showEditGroup: false })}
            showEditGroupCard={showEditGroup}
          />
        )}
      </div>
    )
  }

  handlerGroupCard = ({ groupId, show, showEditGroupCard }) => {
    this.setState({
      groupId,
      showGroupCard: show,
      showNewGroup: false,
      showEditGroup: showEditGroupCard,
    })
  }

  handlerNewGroup = ({ showNewGroupCard }) => {
    this.setState({
      showNewGroup: showNewGroupCard,
      showGroupCard: false,
      showEditGroup: false,
    })
  }
}

class GroupItem extends Component {
  state = {
    open: false,
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
    } = this.props

    return (
      <div
        className={cn('group-item').mix(
          cn(director ? 'group-item_fs' : 'group-item_sb').mix(
            cn(groupId === group && show && 'group-item_active')
          )
        )}
      >
        <div className={cn('group-item-read')} style={group.read ? { background: '#ff2f51'} : { background: 'transparent'}}>
        </div>
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
          <time className={cn('group-item-date-time')}>
            {group.date}<span>, </span>
            {group.time}
          </time>
          <p className={cn('group-item-title')}>
            {group.text_title} {group.text_connecting} {group.text_concluding}
          </p>
          <a href="">{group.link_text}</a>
          <p
            className={cn('group-item-subtitle').mix(
              cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-subtitle_max-w')
            )}
          >
          </p>
        </div>
        {director && (
          <div
            className={cn('group-item-director').mix(
              cn((show || showNewGroupCard || showEditGroupCard) && 'group-item-director_hide')
            )}
          >
            <p className={cn('group-item-director-name')}>{group.director}</p>
          </div>
        )}
        <div
          className={cn('group-item-open-sidebar')}
          title={'Раскрыть карточку группы рассылки'}
          onClick={() => onClick({ groupId: group, show: true, showEditGroupCard: false })}
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

class GroupItemNew extends Component {
  render() {
    return (
      <div className={cn('group-item').mix(cn('group-item_sb').mix(cn('group-item_active')))}>
        <div
          className={cn('group-item-logo')}
          style={{
            background: `url('') center center / cover no-repeat #ededed`,
          }}
        />
        <div className={cn('group-item-name').mix(cn('group-item-name_hide'))}>
          <p className={cn('group-item-title')}>
            Новая группа <sup className={cn('group-item-count-employee')}>0</sup>
          </p>
          <p className={cn('group-item-subtitle').mix(cn('group-item-subtitle_max-w'))}>
            Описание группы
          </p>
        </div>
        <div className={cn('group-item-open-sidebar')}>
          <Arrow
            className={cn('group-item-arrow-icon').mix(cn('group-item-arrow-icon_active'))}
          />
        </div>
      </div>
    )
  }
}

class GroupCard extends Component {
  render() {
    const { group } = this.props
    const { closeSidebar } = this.props
    const { setting } = this.props
    return (
      <div className={cn('group-card-wrapper')}>
        <div className={cn('group-card-func-elements')}>
          <span
            className={cn('group-card-copy-icon-wrapper').mix('cur')}
            title={'Копировать карточку группы'}
          >
            <Copy outline className={cn('group-card-copy-icon')} />
          </span>
          <span
            onClick={closeSidebar}
            className={cn('group-card-closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('group-card-closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('group-card-header')}>
          <h2>{group.title}</h2>
          <p className={cn('group-card-header-autor-date')}>
            Автор — {group.director}
            <time className={cn('group-card-header-date')} dateTime={group.date}>
              Дата создания — {group.date}
            </time>
          </p>
          <p className={cn('group-card-header-description')}>{group.subtitle}</p>
        </div>
        <div className={cn('group-card-participants')}>
          <h3>
            Участники <sup className={cn('group-card-participants-count')}>13</sup>
          </h3>
          {[1, 2, 3].map(() => (
            <div key={Math.random()} className={cn('group-card-participant')}>
              <div
                className={cn('group-card-participant-logo')}
                style={{
                  background: `url('https://pp.userapi.com/c846418/v846418997/35a9d/t4mpfd4FmVE.jpg') center center / cover no-repeat`,
                }}
              />
              <div>
                <Link className={cn('group-card-participant-name')} to={`/`}>
                  {' '}
                  Илон Маск
                </Link>
                <p className={cn('group-card-participant-specialization')}>
                  Специалист по расследованию инцидентов информационной безопасности
                </p>
                <p className={cn('group-card-participant-practice')}>
                  Блок Инновационные решения / Практика спорт
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

class NewGroup extends Component {
  state = {
    open: false,
  }

  render() {
    const { open } = this.state
    const { closeSidebar, showEditGroupCard } = this.props

    return (
      <div className={cn('group-card-wrapper').mix(cn('group-card-wrapper_new'))}>
        <div className={cn('group-card-head-wrapper')}>
          <h2>{showEditGroupCard ? 'Редактирование группы' : 'Новая группа'}</h2>
          <div className={cn('group-card-func-elements').mix(cn('group-card-func-elements_new'))}>
            {showEditGroupCard && (
              <div className={cn('group-item-setting')}>
                <span
                  className={`${cn('group-item-settings')}`}
                  onClick={() => this.setState({ open: !open })}
                  title={open ? 'Закрыть' : 'Открыть'}
                >
                  <Settings outline className={cn('group-item-setting-icon').state({ open: open })} />
                </span>
                {open && (
                  <div className={cn('group-item-settings-menu')}>
                    <ul className={cn('group-item-settings-menu-list')}>
                      <li className={cn('group-item-settings-menu-list-item')}>
                        <a className={cn('group-item-settings-menu-list-item-link')}>
                          Редактировать
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <span
              onClick={closeSidebar}
              className={cn('group-card-closed-thin-icon-wrapper').mix('cur')}
              title={'Закрыть карточку группы'}
            >
              <Close className={cn('group-card-closed-thin-icon')} />
            </span>
          </div>
        </div>

        <div className="required">
          <Field component={BootstrapInput} name="name_group" type="text" label="Название группы" />
        </div>
        <div className="required">
          <Field
            component={BootstrapTextarea}
            name="description_group"
            type="text"
            label="Описание"
          />
          <p className={cn('info-msg')}>Вы можите указать особенность группы</p>
        </div>
        <Field
          name="photo"
          component={ReduxFormDropzoneAvatarCandidate}
          style={{}}
          removable
          multiple={false}
          // cleanField={() => dispatch(change('Container', 'photo', ''))}
          label="Загрузить аватар"
          className={cn('dropzone')
            .mix('cur')
            .toString()}
          icon={true}
        />

        <div>
          <button className={'btn btn-primary btn-margin-right '}>Сохранить</button>
          <button className={'btn btn-primary btn-outline'} onClick={closeSidebar}>
            Отменить
          </button>
        </div>
      </div>
    )
  }
}

export default connector(Container)
