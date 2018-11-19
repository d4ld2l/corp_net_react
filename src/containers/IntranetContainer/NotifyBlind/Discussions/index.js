import React, { Component } from 'react'
import DiscussionItem from './DiscussionItem'

const cn = require('bem-cn')('notify-roster')

export default class Roster extends Component {
  onItemClick = () => {
    const { dispatch } = this.props
    dispatch({ type: 'NOTIFY_BLIND_CHANGE_VIEW', payload: { view: 'show' } })
  }

  render() {
    const {
      topics: { discussions },
    } = this.props
    const { showCard } = this.props

    return (
      <div className={cn}>
        {discussions.map(it => (
          <DiscussionItem key={it.id} discussion={it} {...this.props} />
        ))}
      </div>
    )
  }
}
