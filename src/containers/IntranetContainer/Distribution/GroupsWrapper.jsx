import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import compose from 'ramda/src/compose'

import { GROUP_DATA } from './data'

import { Row, Col } from 'react-bootstrap'
import { change, Field, reduxForm } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'
import Loader from 'components-folder/Loader'

import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'
import { deleteDistribution } from '../../../redux/actions/distributionActions'
import GroupItem from './GroupItem'
import GroupCard from './GroupCard'
import GroupItemNew from './GroupItemNew'
import NewGroup from './NewGroup'


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

export default class GroupsWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: GROUP_DATA,
      showGroupCard: props.defaultOpen,
      showNewGroup: props.defaultOpen,
      showEditGroup: props.defaultOpen,
      groupId: null,
      editGroup: null,
      formName: 'NewDistribution',
    }
  }

/*componentDidUpdate() {
    const search_b = document.querySelector('.distribution__search-b-wrapper-input'),
      card_group = document.querySelector('.distribution__group-card'),
      card_wrapper = document.querySelector('.distribution__group-card-wrapper'),
      card_group_source_top = search_b.getBoundingClientRect().top + window.pageYOffset,
      groups_wrapper = document.querySelector('.distribution__groups-wrapper')

    window.onscroll = () => {
      if (card_group.classList.contains('fixed') && window.pageYOffset < card_group_source_top) {
        card_group && card_group.classList.remove('fixed')
        card_wrapper && card_wrapper.removeAttribute('style')
      } else if (window.pageYOffset > card_group_source_top) {
        card_group && card_group.classList.add('fixed')

        if (card_group.clientHeight >= groups_wrapper.clientHeight) {
          card_wrapper && (card_wrapper.style.height = card_group.clientHeight + 'px')
        } else {
          card_wrapper && (card_wrapper.style.height = groups_wrapper.clientHeight + 'px')
        }
      }
    }
  }*/

  render() {
    const { data } = this.props
    const { showGroupCard, showNewGroup, showEditGroup, groups, groupId, editGroup, formName } = this.state
    const { disabled, available_to_me, personalGroups, availableGroups, search } = this.props
    return (
      <div className={cn('wrapper')}>
        <div
          className={cn('groups-wrapper')}
          style={{ width: showGroupCard || showNewGroup || showEditGroup ? '470px' : '100%' }}
        >
          {disabled || showNewGroup || showEditGroup ? (
            <BtnNewGroup disabled={true} />
          ) : (
            <BtnNewGroup onClick={this.handlerNewGroup} showNewGroupCard={showNewGroup} />
          )}
          <div className={cn('block_wrapper').mix('global-scroll global-scroll_theme_light')}>
            {showNewGroup && <GroupItemNew />}
            {available_to_me
              ? availableGroups.filter(group => group.name.toLowerCase().includes(search.toLowerCase())).map(it => (
                <GroupItem
                  key={Math.random()}
                  group={it}
                  director={true}
                  setting={false}
                  onClick={this.handlerGroupCard}
                  show={showGroupCard}
                  showNewGroupCard={showNewGroup}
                  showEditGroupCard={showEditGroup}
                  handlerEditGroup={() => this.handlerEditGroup(it)}
                  groupId={groupId}
                  {... this.props}
                />
              ))
              : personalGroups.filter(group => group.name.toLowerCase().includes(search.toLowerCase())).map(it => (
                <GroupItem
                  key={Math.random()}
                  group={it}
                  director={false}
                  setting={true}
                  onClick={this.handlerGroupCard}
                  show={showGroupCard}
                  showNewGroupCard={showNewGroup}
                  showEditGroupCard={showEditGroup}
                  groupId={groupId}
                  handlerEditGroup={ () => this.handlerEditGroup(it)}
                  {... this.props}
                />
              ))}
          </div>
        </div>
        {showGroupCard && (
          <GroupCard
            closeSidebar={() => this.setState({ showGroupCard: false })}
            groupId={groupId}
            group={groupId}
            setting={!available_to_me}
            handlerCopyGroup={ (group) => this.handlerCopyGroup(group)}
            onClick={this.handlerGroupCard}
            handlerEditGroup={ (group) => this.handlerEditGroup(group)}
            deleteGroup={ (group) => this.deleteGroup(group) }
            {... this.props}
          />
        )}
        {(showNewGroup || showEditGroup) && (
          <NewGroup
            closeSidebar={() => this.setState({ showNewGroup: false, showEditGroup: false })}
            showEditGroupCard={showEditGroup}
            group={showEditGroup ? editGroup : null}
            form={formName}
          />
        )}
      </div>
    )
  }

  deleteGroup = (group) => {
    if (confirm('Вы уверены?')) {
      const { dispatch } = this.props
      dispatch(deleteDistribution(group.id))
      this.setState({showGroupCard: false})
    }
  }

  handlerEditGroup = (group) => {
    this.setState({showEditGroup: true, showGroupCard: false, editGroup: group, formName: 'EditDistribution'})
  }

  handlerCopyGroup = (group) => {
    this.setState({showEditGroup: true, showGroupCard: false, editGroup: group, formName: 'NewDistribution'})
  }

  handlerGroupCard = ({ groupId, show, showEditGroupCard }) => {
    this.setState({
      groupId,
      showGroupCard: show,
      showNewGroup: false,
      showEditGroup: showEditGroupCard,
      formName: 'NewDistribution',
      editGroup: null,
    })
  }

  handlerNewGroup = ({ showNewGroupCard }) => {
    this.setState({
      showNewGroup: showNewGroupCard,
      showGroupCard: false,
      showEditGroup: false,
      formName: 'NewDistribution',
      editGroup: null,
    })
  }
}

class BtnNewGroup extends Component {
  render() {
    const { disabled, onClick } = this.props

    return (
      <div className={cn('btn-new-group-wrapper')}>
        {disabled ? (
          <button className={'btn btn-primary btn-small'} disabled>
            Новая команда
          </button>
        ) : (
          <button
            className={'btn btn-primary btn-small'}
            title={'Создать новую команду'}
            onClick={() => onClick({ showNewGroupCard: true })}
          >
            Новая команда
          </button>
        )}
      </div>
    )
  }
}
