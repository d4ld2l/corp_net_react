import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'
import Tabs from './Tabs'

const cn = require('bem-cn')('employment-info')
if (process.env.BROWSER) {
  require('./css/employmentInfo/employmentInfo.css')
}
moment.locale('ru')

export default class EmploymentInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const { open } = this.state

    return (
      <div className={cn} id="employment-info">
        <div className={cn('head').mix(cn('custom'))} onClick={() => this.setState({ open: !open })}>
          <h3>Информация по трудоустройству</h3>

          {open ? (
            <Arrow className={cn('open-icon')} />
          ) : (
            <Arrow className={cn('close-icon')} />
          )}
        </div>
        <Collapse in={this.state.open}>
          <div>
            <Tabs />
          </div>
        </Collapse>
      </div>
    )
  }
}
