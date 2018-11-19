import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'react-bootstrap'

import NewsTabs from './NewsTabs'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('intranet-news')
if (process.env.BROWSER) {
  require('./Container.css')
}

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { data } = this.props

    return (
      <div className={cn}>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <ol className="breadcrumb">
              <li>
                <Link to="/">Главная</Link>
              </li>
              <Arrow dir={'right'} className={cn('chevron-icon')} />
              <li className="active">
                <span>Новости</span>
              </li>
            </ol>
            <h1>Новости</h1>
            <NewsTabs />
          </Col>
        </Row>
      </div>
    )
  }
}
