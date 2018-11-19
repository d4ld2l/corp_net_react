import React, { Component } from 'react'
import TaskWrapper from './Task/TaskWrapper'
import { changeTMScope } from 'redux-folder/actions/taskActions'
import get from 'lodash/get'
import { TASK_SCOPES } from './data'

const cn = require('bem-cn')('filtering')

if (process.env.BROWSER) {
  require('./css/style.css')
}

class Filtering extends Component {

  handlerChangeScope = (filter) => {
    const { scope, dispatch } = this.props
    if (filter !== scope){
      dispatch(changeTMScope(filter))
    }
  }

  render() {
    const { scope, count, status, edit } = this.props

    return (
      <div>
        <div className={cn.mix('tasks__filtering')}>
          {TASK_SCOPES.map(it => (
            <button
              key={it.id+status}
              className={cn('btn').state({ current: scope === it.id })}
              disabled={edit}
              onClick={() => this.handlerChangeScope(it.id)}
              data-name={it.id}
            >
              {it.name}
              <sup className={'tasks__count'}>{get(count, `${status}.${it.id}`, 0) || 0}</sup>
            </button>
          ))}
        </div>

        <TaskWrapper {...this.props}/>
      </div>
    )
  }
}

export default Filtering
