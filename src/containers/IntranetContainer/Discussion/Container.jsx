import React, { Component } from 'react'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'

import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Header from './Header'
import Tabs from './Tabs'
import Discussions from './Discussions'

export const cn = require('bem-cn')('discussion')
if (process.env.BROWSER) {
  require('./Checkbox/style.css')
}

moment.locale('ru')

export default class Container extends Component {
  render() {
    const {
      system: { menu },
    } = this.props
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
            <Header name={menu.find(it => it.id === 'shr_discussions').label} />
            <Tabs {...this.props} />
            <Discussions {...this.props} />
          </Col>
        </Row>
      </div>
    )
  }
}
