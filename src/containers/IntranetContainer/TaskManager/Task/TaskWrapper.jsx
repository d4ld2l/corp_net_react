import React, { Component } from 'react'
import moment from 'moment/moment'
import { Filter } from 'components-folder/Icon'
import TaskCard from '../Card/TaskCard'
import TaskForm from './TaskForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTasks, getSubtasks, searchTasks, createTask, updateTask } from 'redux-folder/actions/taskActions'
import { getEmployees } from 'redux-folder/actions/employeesActions'
import TaskList from './TaskList'

const cn = require('bem-cn')('tasks')

if (process.env.BROWSER) {
  require('../css/style.css')
}

moment.locale('ru')

const connector = connect(
  state => ({
    user: state.user,
    page: state.tasks.page,
    scroll: state.tasks.scroll,
    status: state.tasks.status,
    scope: state.tasks.scope,
    count: state.tasks.count,
    openCard: state.tasks.openCard,
    openForm: state.tasks.openForm,
    current: state.tasks.current,
    // currentId: state.tasks.currentId,
    edit: state.tasks.edit,
    parent: state.tasks.parent,

    tasksLoading: state.loaders.tasks,
    taskLoading: state.loaders.task,
    taskFormLoading: state.loaders.taskFormLoading,
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        getEmployees,
        getTasks,
        getSubtasks,
        searchTasks,
        createTask,
        updateTask
      },
      dispatch,
    ),
    dispatch, // pass dispatch
  })
)

class TaskWrapper extends Component {
  state = {
    task: null,
    parent: null,
    view: null, // null, 'show', 'new', 'edit', 'subtask'
  }

  componentDidUpdate(prevProps) {
    if (this.props.inCurtain) {
      return
    }

    const tasks = document.querySelector('.roster__tasks')

    try {
      tasks && (tasks.clientHeight > 750 && tasks.classList.add('roster__tasks_active').mix('global-scroll global-scroll_theme_light'))
    } catch (error) { }

    const { tab, filter } = this.props

    if (tab !== prevProps.tab || filter !== prevProps.filter) {
      this.setView()
    }
  }

  get anyTaskView() {
    const { openCard, openForm } = this.props
    return openCard || openForm
  }

  markDone = async (task) => {
    const { updateTask, dispatch } = this.props
    const data = await updateTask(task, { done: !task.done })
    dispatch({type: 'TM_TOGGLE_TASK', payload: data})
    if (data.parent_id) {
      let current = this.state.task
      this.syncTask({
        ...current,
        subtasks: current.subtasks.map(t => t.id === data.id ? data : t)
      })
    } else {
      this.syncTask({ ...data, subtasks: task.subtasks })
    }

    return data
  }

  setView = ({ view = null, task = null } = {}) => {
    const { tasks } = this.props

    let currentTask = task || (view ? this.state.task : null)
    // let p = parent || (task && task.parent_id ? this.state.parent : null)
    let parent = currentTask && currentTask.parent_id && tasks.find(t => t.id === currentTask.parent_id)

    this.setState({
      view,
      task: currentTask,
      parent,
    })
  }

  syncTask = (data) => {
    this.setState({
      task: data
    })
  }

  openFormHandler = async () => {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_OPEN_FORM_TASK' })
  }

  renderRoster() {
    const { inCurtain, edit } = this.props

    if (inCurtain) {
      return <TaskList { ...this.props } />
    } else {
      return (
        <div
          className={cn('roster').mix(
            this.anyTaskView ? 'roster roster_roll-up' : 'roster'
          )}
          style={{ width: this.anyTaskView ? '470px' : '100%' }}
        >
          <div className="roster__header">
            <button
              className={'btn btn-primary btn-small'}
              title={'Создать новую задачу'}
              onClick={this.openFormHandler}
              disabled={edit}
            >
              Новая задача
            </button>

            <span className="roster__filter filter">
              <Filter className="filter__icon filter__icon_disabled" />
            </span>
          </div>

          <TaskList { ...this.props } />
        </div>
      )
    }
  }

  render() {
    const {
      inCurtain,
      openCard,
      openForm,
    } = this.props

    const {
      task,
      view,
    } = this.state


    return (
      <div
        className={inCurtain ? null : cn('l-grid').mix(
          cn(this.anyTaskView && 'l-grid_flex')
        )}
      >
        {!(inCurtain && (openCard || openForm)) && this.renderRoster()}

        { openCard && (
          <TaskCard { ...this.props } />
        )}

        { openForm && (
          <TaskForm
            closeSidebar={() => this.setView()}
            closeForm={() => this.setView({ view: 'show' })}
            task={task}
            view={view}
            markDone={this.markDone}
            showTaskCard={(task) => this.setView({ view: 'show', task }) }
            { ...this.props }
          />
        )}
      </div>
    )
  }
}


export default connector(TaskWrapper)
