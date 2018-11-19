import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import compose from 'ramda/src/compose'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { reduxForm } from 'redux-form'

import Loader from 'components-folder/Loader'

import { getDistribution } from '../../../redux/actions/distributionActions'
import Tabs from './Tabs'

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

const connector = compose(
  reduxForm({
    form: 'Container',
    validate,
  })
)

class Container extends Component {

  componentDidMount(){
    const { dispatch, user } = this.props
    dispatch(getDistribution(user.user_id || user.id))
  }

  render() {
    const { loader, data } = this.props

    if (loader || !data ) {
      return(
        <Loader/>
      )
    }
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Helmet>
              <title>Команды</title>
            </Helmet>
            <Breadcrumbs breadcrumbs={[
              { name: 'Команды', active: true },
            ]}/>
            <Header/>
            <Tabs {... this.props} />
          </Col>
        </Row>
      </div>
    )
  }
}

const Header = () => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>Команды</h1>
  </div>
)

export default connector(Container)
