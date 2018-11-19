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

export default class GroupItemNew extends Component {
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
          <p className={cn('group-item-title').mix('p1 p1_theme_light_first')}>
            Новая команда <sup className={cn('group-item-count-employee').mix('p4 p4_theme_light_first')}>0</sup>
          </p>
          <p className={cn('group-item-subtitle').mix('p1 p1_theme_light_first').mix(cn('group-item-subtitle_max-w'))}>
            Описание команды
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
