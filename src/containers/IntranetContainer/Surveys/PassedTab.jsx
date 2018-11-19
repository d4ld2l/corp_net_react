import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PassedSurveysBlock from './PassedSurveysBlock'

const cn = require('bem-cn')('passed-tab')

if (process.env.BROWSER) {
  require('./passed-tab.css')
}

export default class PassedTab extends Component {
  render() {
    return (
      <div className={cn()}>
        <PassedSurveysBlock surveys={this.props.surveys} isSearch={this.props.isSearch} />
      </div>
    )
  }
}
