import React, { Component } from 'react'
// import { compose, pick } from 'ramda'
// import { connect } from 'react-redux'
// import { reduxForm } from 'redux-form'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import SurveyForm from './SurveyForm'
import Breadcrumbs from 'components-folder/Breadcrumbs/'

const cn = require('bem-cn')('new-survey')

if (process.env.BROWSER) {
  require('./Container.css')
}
moment.locale('ru')

export default class SurveyFormContainer extends Component {
  render() {
    const { match: { params: { id } } } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs
              breadcrumbs={[{ name: `${id ? 'Редактирование' : 'Создание'} опроса`, active: true }]}
            />
            <h1>{`${id ? 'Редактирование' : 'Создание'} опроса`}</h1>
          </Col>
        </Row>
        <SurveyForm {...this.props} />
      </div>
    )
  }
}
