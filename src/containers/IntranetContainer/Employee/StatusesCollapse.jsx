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

export default class StatusesCollapse extends Component {
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
      <div className={cn} id="statuses">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <h3>Статусы</h3>

          {open ? (
            <Arrow className={cn('open-icon')} />
          ) : (
            <Arrow className={cn('close-icon')} />
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('table')}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <label className={('p3 p3_theme_light fw_300')}>Дата</label>
                    </th>
                    <th>
                      <label className={('p3 p3_theme_light fw_300')}>Статус</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data.state &&
                  <tr key={Math.random()}>
                    <td>
                      <time className={('p1 p1_theme_light_first')} dateTime={moment(data.state.created_at).format('DD.MM.YYYY')}>
                        {moment(data.state.created_at).format('DD.MM.YYYY')}
                      </time>
                    </td>
                    <td>
                      <p className={('p1 p1_theme_light_first')}>{data.state.state}</p>
                    </td>
                  </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
