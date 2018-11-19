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
import { getDistribution } from '../../../redux/actions/distributionActions'
import GroupsWrapper from './GroupsWrapper'
import debounce from 'lodash/debounce'


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


export default class Tabs extends Component {
  state = {
    currentTab: 'my-group',
    groups: GROUP_DATA,
    search: '',
  }

  handleSearch = () => {

  }

  renderMyGroups = () =>  <GroupsWrapper {... this.props} search={this.state.search}/>

  renderAvailableToMe = () => <GroupsWrapper disabled={true} available_to_me={true} {... this.props} search={this.state.search} />

  render() {
    const { currentTab, groups } = this.state
    const { personalGroups, availableGroups } = this.props

    return (
      <div>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
            <li
              className={cn('tabs-list-item').mix('p1 p1_theme_light_first')
                .mix('cur')
                .state({ current: currentTab === 'my-group' })}
              onClick={() => this.setState({ currentTab: 'my-group', search: '' })}
            >
              Мои команды
              <sup className={cn('count').mix('p4 p4_theme_light_third')}>{personalGroups.length}</sup>
            </li>
            <li
              className={cn('tabs-list-item').mix('p1 p1_theme_light_first')
                .mix('cur')
                .state({ current: currentTab === 'available-to-me' })}
              onClick={() => this.setState({ currentTab: 'available-to-me', search: '' })}
            >
              Доступные мне
              <sup className={cn('count').mix('p4 p4_theme_light_third')}>{availableGroups.length}</sup>
            </li>
          </ul>
          <div className={cn('search-b')}>
            <div className={cn('search-b-wrapper-input')}>
              <input
                type="text"
                className={cn('search-b-input')}
                value={this.state.search}
                onChange={(e) => this.setState({search: e.target.value})}
              />
              <Loupe className={cn('icon-loupe')} />
            </div>
            <button onClick={() => this.handleSearch()} className={'btn btn-primary'}>Найти</button>
          </div>
        </div>

        {currentTab === 'my-group' && this.renderMyGroups()}
        {currentTab === 'available-to-me' && this.renderAvailableToMe()}
      </div>
    )
  }
}
