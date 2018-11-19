import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import SettingHowToDisplay from './SettingHowToDisplay'
import Loader from 'components-folder/Loader'
import { getAnalyticsStats } from '../../../redux/actions/analyticsActions'
import Wrapper from 'components-folder/Wrapper'

const cn = require('bem-cn')('analytics')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class Container extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(
      getAnalyticsStats({
        start_date:
          moment()
            .subtract(1, 'weeks')
            .format('YYYY-MM-DD') + 'T00:00',
      })
    )
  }

  render() {
    const { loaders } = this.props

    if (loaders.analyticsStats) {
      return (
        <Wrapper className={cn}>
          <Helmet>
            <title>Аналитика</title>
          </Helmet>
          <Breadcrumbs />
          <Header />
          <Loader />
        </Wrapper>
      )
    }

    return (
      <Wrapper className={cn}>
        <Helmet>
          <title>Аналитика</title>
        </Helmet>
        <Breadcrumbs />
        <Header />
        <SettingHowToDisplay {...this.props} />
      </Wrapper>
    )
  }
}

const Header = () => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>Воронка подбора</h1>
  </div>
)
