import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('personnel-movement-collapse')
if (process.env.BROWSER) {
  require('./css/personelMovementCollapse/personelMovementCollapse.css')
}
moment.locale('ru')

export default class PersonnelMovementCollapse extends Component {
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
      <div className={cn} id="personnel_information">
        <div className={cn('head').mix(cn('custom'))} onClick={() => this.setState({ open: !open })}>
          <h3>Кадровые перемещения</h3>

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
                      <label  className={('p3 p3_theme_light')}>Дата</label>
                    </th>
                    <th>
                      <label  className={('p3 p3_theme_light')}>Откуда</label>
                    </th>
                    <th>
                      <label  className={('p3 p3_theme_light')}>Куда</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                        <tr>
                          <td>
                            <time className={('p1 p1_theme_light_first')}>
                              18.22.1231
                            </time>
                          </td>
                          <td>
                            <p className={('p1 p1_theme_light_first')}>Лига W</p>
                          </td>
                          <td>
                            <p className={('p1 p1_theme_light_first')}>Р.Т.Решение</p>
                          </td>
                        </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
