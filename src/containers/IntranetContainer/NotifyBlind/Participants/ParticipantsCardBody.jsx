import React, { Component } from 'react'
import { v4 } from 'uuid'
import ParticipantsItem from './ParticipantsItem'

const cn = require('bem-cn')('notify-participants-card-body')

export default class ParticipantsCardBody extends Component {
  render() {
    const {
      accounts,
      topics: { activeDiscussion },
    } = this.props
    return (
      <div className={cn}>
        <h3 className={cn('h3')}>
          Участники <sup className={cn('count')}>{activeDiscussion.discussers.length}</sup>
        </h3>
        {activeDiscussion.discussers
          .map(({ account_id }) => accounts.find(({ id }) => id === account_id))
          .map(it => (
            <ParticipantsItem key={it.id} member={it} />
          ))}
      </div>
    )
  }
}
