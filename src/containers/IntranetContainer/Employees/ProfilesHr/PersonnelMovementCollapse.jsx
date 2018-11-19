import React, { Component } from 'react'
import moment from 'moment'
import { Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'
import flatten from 'lodash/flatten'
import sortBy from 'lodash/sortBy'
import remove from 'lodash/remove'

const cn = require('bem-cn')('personnel-movement-collapse')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/personelMovementCollapse/personelMovementCollapse.css')
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
    const { current } = this.props

    const legal_units = current.all_legal_unit_employees
    const transfers_histories = sortBy(flatten(
      legal_units.map(it => it.transfers_history.map(history => ({
          ...history,
          legalUnitName: it.legal_unit_name
      })))
    ), 'transfer_date')

    return (
      <div className={cn} id="personnel_information">
        <div className={cn('head').mix('personnel-movement-collapse__custom')} onClick={() => this.setState({ open: !open })}>
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
                      <label className={('p3 p3_theme_light')}>Дата изменения</label>
                    </th>
                    <th>
                      <label className={('p3 p3_theme_light')}>Юр. лицо</label>
                    </th>
                    <th>
                      <label className={('p3 p3_theme_light')}>Было</label>
                    </th>
                    <th>
                      <label className={('p3 p3_theme_light')}>Стало</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                  transfers_histories.map((it, i) => (
                    <tr key={i}>
                      <td>
                        <p className={('p1 p1_theme_light_first')}>{it.transfer_date && moment(it.transfer_date).format('DD.MM.YYYY')}</p>
                      </td>
                      <td>
                        <p className={('p1 p1_theme_light_first')}>{it.legalUnitName || ''}</p>
                      </td>
                      <td>
                        <p className={('p1 p1_theme_light_first')}>{`${it.transfer_type || ''}: ${it.previous_value || '-'}`}</p>
                      </td>
                      <td>
                        <p className={('p1 p1_theme_light_first')}>{`${it.transfer_type || ''}: ${it.next_value || '-'}`}</p>
                      </td>
                    </tr>
                  ))
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
