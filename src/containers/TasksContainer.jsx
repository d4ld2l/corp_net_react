import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const connector = connect(state => ({ state }))

class TasksContainer extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>HR - Задачи</title>
        </Helmet>
        TasksContainer
      </div>
    )
  }
}

export default connector(TasksContainer)
