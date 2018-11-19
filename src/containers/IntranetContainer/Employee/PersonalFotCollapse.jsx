import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('personnel-movement-collapse')

if (process.env.BROWSER) {
  require('./personnel-movement-collapse.css')
}
moment.locale('ru')

export default class PersonalFotCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const { open } = this.state
    const { data } = this.props

    return (
      <div className={cn} id="personnel_information_fot">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <span className={cn('title').mix('p1 p1_theme_light_first fw_600')}>ФОТ: </span>
          <span>{data.wage}</span>
          <span className={cn('title').mix('p1 p1_theme_light_first fw_600')}>Ставка: </span>
          <span>{data.wage_rate}</span>

          {open ? (
            <Arrow dir={'up'} className={cn('open-icon')} />
          ) : (
            <Arrow className={cn('close-icon')} />
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <Row className={cn('inner')}>
              <Col xs={6}>
                <div className={cn('info-block')}>
                  <label className={('p3 p3_theme_light fw_300')}>Оклад:</label>
                  <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{data.pay}</p>
                </div>
              </Col>
              <Col xs={6}>
                <div className={cn('info-block')}>
                  <label className={('p3 p3_theme_light fw_300')}>Надбавка:</label>
                  <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{data.extrapay}</p>
                </div>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
    )
  }
}
