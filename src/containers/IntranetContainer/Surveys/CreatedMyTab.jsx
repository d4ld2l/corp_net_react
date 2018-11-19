import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import CreatedMySurveysBlock from './CreatedMySurveysBlock'

const cn = require('bem-cn')('new-tab')

if (process.env.BROWSER) {
  require('./new-tab.css')
}

export default class CreatedMyTab extends Component {
  render() {
    return (
      <div className={cn()}>
        <CreatedMySurveysBlock surveys={this.props.surveys} isSearch={this.props.isSearch} />
      </div>
    )
  }
}
