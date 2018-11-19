import React, { Component } from 'react'
import Filtering from './Filtering'
import get from 'lodash/get'
import { TASK_STATUSES } from './data'

import { changeTMStatus, getTasks } from 'redux-folder/actions/taskActions'

const cn = require('bem-cn')('tabs')

if (process.env.BROWSER) {
  require('./css/style.css')
}

class Tabs extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTasks(1))
  }

  handlerChangeStatus = (tab) => {
    const { status, dispatch } = this.props
    if (tab !== status){
      dispatch(changeTMStatus(tab))
    }
  }

  render() {
    const { status, count } = this.props
    return (
      <div>
        <div className={cn.mix('tasks__tabs')}>
          <ul className={cn('list')}>
            {TASK_STATUSES.map((it, index) => (
              <li
                key={index}
                className={cn('item').state({ current: status === it.id })}
                onClick={() => this.handlerChangeStatus(it.id) }
              >
                {it.name}
                <sup className={'tasks__count'}>{status !== it.id ? get(count, `${it.id}.available_to_me`, 0) : ''}</sup>
              </li>
            ))}
          </ul>
        </div>
        <Filtering {...this.props}/>
      </div>
    )
  }
}

export default Tabs
