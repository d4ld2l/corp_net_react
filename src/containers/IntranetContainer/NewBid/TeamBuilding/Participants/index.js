import React, { Component } from 'react'

import EmployeeSearch from './EmployeesSearch'

const cn = require('bem-cn')('new-bid-team-building')
if (process.env.BROWSER) {
  require('./styles.css')
}

export default class Participants extends Component {
  render() {
    return (
      <div className={cn('aside')}>
        <EmployeeSearch />
      </div>
    )
  }
}
