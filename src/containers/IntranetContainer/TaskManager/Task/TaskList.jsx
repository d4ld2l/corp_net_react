import React, { Component } from 'react'
import Loader from 'components-folder/Loader'
import TaskItem from './TaskItem'
import TaskHeader from './TaskHeader'
import sortBy from 'lodash/sortBy'
import { connect } from 'react-redux'
import { getTasks } from 'redux-folder/actions/taskActions'
import block from 'bem-cn'

const connector = connect(
  state => ({
    tasksLoading: state.loaders.tasks,
    tasksLoadingMore: state.loaders.tasksMore,
  }),
  {
    getTasks
  }
)

class TaskList extends Component {

  handleScroll = () =>  {
    const { scroll, dispatch, page, tasksLoading } = this.props

    if (scroll) {
      const el = this.tasksContainer
      const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop

      if (scrollBottom < 550 && !tasksLoading) {
        dispatch(getTasks(page))
      }
    }
  }

  render() {
    const {
      data,
      tasksLoading,
      page,
      cn = block('task-list')
    } = this.props

    if (tasksLoading) {
      return <Loader />
    }

    return (
      <div className={cn}>
        { data.length > 0 && <TaskHeader { ...this.props } cn={cn} /> }

        {/*{roster__tasks}*/}
        <div className={cn('tasks')} ref={node => this.tasksContainer = node} onScroll={this.handleScroll}>
          { (tasksLoading && page === 1) ? <Loader/> : (
            sortBy(data, ['executed_at', 'priority', 'title']).map(it => (
              <TaskItem
                cn={cn}
                key={it.id}
                task={it}
                {...this.props}
              />
            ))
          )}

          {(tasksLoading && page !== 1) && <Loader/>}
        </div>
      </div>
    )
  }
}

export default connector(TaskList)
