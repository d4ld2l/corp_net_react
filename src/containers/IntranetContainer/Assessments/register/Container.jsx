import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Tabs from './Tabs'

export const cn = require('bem-cn')('assessments')
if (process.env.BROWSER) {
  require('./css/style.css')
}

moment.locale('ru')



export default class Container extends Component {
  render() {
    const {system: { menu }} = this.props

    return (
      <div className={'container'}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Helmet>
              <title>{menu.find(it => it.id === 'shr_assessment').label}</title>
            </Helmet>
            <Breadcrumbs />
            <Header name={menu.find(it => it.id === 'shr_assessment').label} />
            <Tabs {...this.props}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const Header = ({name}) => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>{name}</h1>
  </div>
)
