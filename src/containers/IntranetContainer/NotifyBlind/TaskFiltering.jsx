import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTMStatus, changeTMScope } from 'redux-folder/actions/taskActions'
import { TASK_STATUSES, TASK_SCOPES } from 'containers-folder/IntranetContainer/TaskManager/data'
import ReactResponsiveSelect from 'react-responsive-select'
import TaskWrapper from 'containers-folder/IntranetContainer/TaskManager/Task/TaskWrapper'

const cn = require('bem-cn')('aside')

const connector = connect(
  state => ({
    status: state.tasks.status,
    scope: state.tasks.scope,
    // count: state.tasks.count,
  }),
  {
    changeTMStatus,
    changeTMScope,
  }
)

class TaskFiltering extends Component {
  // state = {
  //   showFilters: false
  // }

  handleStatusChange = ({ value }) => {
    const { status, changeTMStatus } = this.props

    if (value !== status) {
      changeTMStatus(value)
    }
  }

  handleScopeChange = ({ value }) => {
    const { scope, changeTMScope } = this.props

    if (value !== scope) {
      changeTMScope(value)
    }
  }

  get statusesForSelect() {
    return TASK_STATUSES.map(s => ({
      value: s.id,
      text: s.name,
    }))
  }

  get scopesForSelect() {
    return TASK_SCOPES.map(s => ({
      value: s.id,
      text: s.name,
    }))
  }

  render() {
    // const { showFilters } = this.state
    const { tasks, showFilters, openTaskCard, openTaskForm } = this.props
    const caretIcon = <div className={'select__dropdown-icon'} />

    return (
      <div>
        {showFilters && !(openTaskCard || openTaskForm) && (
          <div className={cn('filtered')}>
            <div className={'select'}>
              <div className={'select__box'}>
                <ReactResponsiveSelect
                  name="author"
                  options={this.statusesForSelect}
                  caretIcon={caretIcon}
                  prefix="Статус: "
                  onChange={this.handleStatusChange}
                />

                <ReactResponsiveSelect
                  name="author"
                  options={this.scopesForSelect}
                  caretIcon={caretIcon}
                  prefix="Фильтр: "
                  onChange={this.handleScopeChange}
                />
              </div>
            </div>
          </div>
        )}

        <TaskWrapper data={tasks} inCurtain />
      </div>
    )
  }
}

export default connector(TaskFiltering)
