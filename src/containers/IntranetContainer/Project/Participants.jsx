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
import { getProfilesProject, toggleTabProfilesProject } from '../../../redux/actions/profilesProjectActions'
import ParticipantItem from './ParticipantItem'
import ParticipantsWrapper from './ParticipantsWrapper'
import Search from './Search'


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
const cn = require('bem-cn')('participants')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

const validate = values => {
  const errors = {}

  if (!values.name_participant) {
    errors.name_participant = 'Обязательное поле'
  }

  if (!values.description_participant) {
    errors.description_participant = 'Обязательное поле'
  }

  return errors
}

export default class Participants extends Component {
  state = {
    currentTab: PARTICIPANTS_TABS[0].nameTab,
    participants: PARTICIPANTS_DATA,
    participants_tabs: PARTICIPANTS_TABS,
  }

  componentDidMount(){
    const {dispatch, project} = this.props
    dispatch({ type: 'RESET_PROFILES_PROJECT'})
    dispatch(toggleTabProfilesProject('total', project.id))
  }

  toggleTab(tab){
    const { dispatch, profilesProject: {activeTab}, project } = this.props
    if (tab !== activeTab){
      dispatch(toggleTabProfilesProject(tab, project.id))
    }
  }

  countTab = tab =>{
    const { profilesProject } = this.props
    switch (tab){
      case 'total':
        return profilesProject.totalCount;
      case 'active':
        return profilesProject.activeCount;
      case 'gone':
        return profilesProject.goneCount;
    }
  }

  render() {
    const { currentTab, participants, participants_tabs } = this.state
    const { profilesProject, loaders, project } = this.props

    return (
      <div>
        <Search key={project.id}{...this.props}/>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn clearfix')}>
            {participants_tabs.map(it => (
              <li
                key={it.nameTab}
                className={cn('tabs-list-item')
                  .mix('cur')
                  .state({ current: profilesProject.activeTab === it.nameTab })}
                onClick={() => this.toggleTab(it.nameTab)}
              >
                <p className={cn('tabs-list-item-text')}>
                  {it.title}
                  <sup className={cn('tabs-list-item-count-employee')}>{
                    this.countTab(it.nameTab)
                  }</sup>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <ParticipantsWrapper {...this.props}/>
      </div>
    )
  }
}
