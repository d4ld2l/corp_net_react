import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { resetTasks } from 'redux-folder/actions/taskActions'
import { getDictionaryAccounts } from 'redux-folder/actions/dictionariesActions'

import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Wrapper from 'components-folder/Wrapper'

import Tabs from './Tabs'

const cn = require('bem-cn')('tasks')
if (process.env.BROWSER) {
  require('./css/style.css')
}
moment.locale('ru')

export default class Container extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getDictionaryAccounts())
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetTasks())
  }

  render() {
    const {system: { menu }} = this.props.state

    return (
      <Wrapper>
        <Helmet>
          <title>{menu.find(it => it.id === 'shr_tasks').label}</title>
        </Helmet>
        <Breadcrumbs />
        <Header name={menu.find(it => it.id === 'shr_tasks').label}/>
        <Tabs {... this.props} />
      </Wrapper>
    )
  }
}

const Header = ({name}) => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>{name}</h1>
  </div>
)
