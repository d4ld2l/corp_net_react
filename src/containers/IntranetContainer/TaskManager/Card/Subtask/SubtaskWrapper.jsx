import React, { Component } from 'react'
import NewSubtaskForm from './NewSubtaskForm'
import SubtaskItem from './SubtaskItem'
import {change} from "redux-form"
import sortBy from 'lodash/sortBy'

const cn = require('bem-cn')('subtask')

if (process.env.BROWSER) {
  require('../../css/style.css')
}

export default class SubtaskWrapper extends Component {
  state = {
    subtasks: []
  }

  async componentDidMount() {
    this.initSubtasks()
  }

  componentDidUpdate(prevProps) {
    const {current } = this.props

    if (current.id !== prevProps.current.id) {
      this.initSubtasks()
    }

    if (prevProps.current.subtasks && current.subtasks && current.subtasks.length !== prevProps.current.subtasks.length) {
      this.setState({
        subtasks: current.subtasks.map((t, index) => ({ ...t, index}))
      })
    }
  }

  async initSubtasks() {
    const { getSubtasks, current, syncTask, view, edit, openCard } = this.props

    // reset and then fetch
    if (edit || openCard){
      this.setState({
        subtasks: current.subtasks_available_to_account || []
      })

        // , async () => {
        //   if (!current.parent_id && view === 'show') {
        //     const subtasks = await getSubtasks(current.id)
        //
        //     this.setState({
        //       subtasks: subtasks.map((t, index) => ({ ...t, index}))
        //     })
        //
        //     syncTask({ ...current, subtasks }) // update current task
        //   }
        // })
    }

  }

   addSubtask = async (data, reset) => {
    const { submitOnChange, current, updateTask, showTaskCard, view, openCard } = this.props

    if (submitOnChange) {
      const data = await updateTask(current, { only: 'subtasks' })
      // showTaskCard(data)
      openCard && reset()
      // this.forceUpdate()
    } else {
      this.setState({
        subtasks: [...this.state.subtasks, data]
      })
    }
  }

   markDone = async (subtask, index) => {
    const { dispatch, view } = this.props

    if (view === 'show') {
      let data = await this.props.markDone(subtask)
      this.setState({
        subtasks: this.state.subtasks.map(t => t.index === index ? { ...t, done: data.done } : t)
      })
    } else {
      dispatch(change('Task', `subtasks[${index}].done`, !subtask.done))
      this.setState({
        subtasks: this.state.subtasks.map((t, i) => i === index ? { ...t, done: !subtask.done } : t)
      })
    }
  }

  toggleDone = (subtask, index) => {
    this.setState({
      subtasks: this.state.subtasks.map((t, i) => i === index ? { ...t, done: !subtask.done } : t)
    })
  }

  render() {
    const { current, setView, view, openCard } = this.props
    const { subtasks } = this.state

    return (
      <div className={cn('wrapper')}>
        <NewSubtaskForm
          view={view}
          task={current}
          addSubtask={this.addSubtask}
          submitOnChange={openCard}
        />
        {
          openCard ? (
            sortBy(current.subtasks_available_to_account, ['executed_at', 'priority', 'title']).map((it, index) => (
              <SubtaskItem
                key={it.id}
                subtask={it}
                setView={setView}
                {...this.props}
              />
            ))
          ) : (
            sortBy(subtasks, ['executed_at', 'priority', 'title']).map((it, index) => (
              <SubtaskItem
                key={index}
                subtask={it}
                setView={setView}
                toggleDone={() => this.toggleDone(it, index)}
                {...this.props}
              />
            ))
          )
        }
      </div>
    )
  }
}
