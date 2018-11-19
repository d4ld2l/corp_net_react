import React, { Component } from 'react'
import moment from 'moment'
import { Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'
import Tabs from './Tabs'
import {get, isEmpty} from "lodash";

const cn = require('bem-cn')('employment-info')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/employmentInfo/employmentInfo.css')
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
    const { current } = this.props
    const legal_units = get(current, 'all_legal_unit_employees') && current.all_legal_unit_employees.filter(it => it.state_name !== 'Уволен')

    if (isEmpty(legal_units)) {
      return (
        <div></div>
      )
    }

    return (
      <div className={cn} id="employment-info">
        <div className={cn('head').mix('personnel-movement-collapse__custom')} onClick={() => this.setState({ open: !open })}>
          <h3>Информация по трудоустройству</h3>

          {open ? (
            <Arrow className={cn('open-icon')} />
          ) : (
            <Arrow className={cn('close-icon')} />
          )}
        </div>
        <Collapse in={this.state.open}>
          <div>
            <Tabs { ...this.props} legal_units = {legal_units}/>
          </div>
        </Collapse>
      </div>
    )
  }
}
