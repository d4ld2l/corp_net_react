import React, { Component } from 'react'

import NotifyButton from './NotifyButton'
import Aside from './Aside'

if (process.env.BROWSER) {
  require('./css/style.css')
}

export default class Container extends Component {
  componentDidMount() {
    const { getTasks, getDictionaryAccounts, initTopics, enabledComponents, dispatch } = this.props
    dispatch({ type: 'INIT_NOTIFY_BLIND', payload: enabledComponents })
    initTopics()
    getTasks()
    getDictionaryAccounts()
  }

  componentWillUnmount() {
    this.props.resetTasks()
  }

  toggle = () => {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND' })
  }

  render() {
    const { view, enabledComponents } = this.props
    if (
      !enabledComponents.shr_discussions &&
      !enabledComponents.recruitment_tasks &&
      !enabledComponents.shr_tasks
    )
      return <div />
    return <div>{view ? <Aside {...this.props} /> : <NotifyButton onClick={this.toggle} />}</div>
  }
}
