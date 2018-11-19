import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SidebarTasks from './SidebarTasks'
import SidebarWorkingWithCandidate from './SidebarWorkingWithCandidate'

const cn = require('bem-cn')('sidebar')
if (process.env.BROWSER) {
  require('./Sidebar.css')
}
export default class Sidebar extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className={cn}>
        <div className="panel">
          <h3 className="panel-title">Работа с кандидатом</h3>

          <SidebarWorkingWithCandidate />
        </div>

        {/*<div className="panel">*/}
        {/*<h3 className="panel-title">Задачи</h3>*/}

        {/*<SidebarTasks />*/}
        {/*</div>*/}
      </div>
    )
  }
}
