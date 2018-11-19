import React, { Component } from 'react'
import ParticipantsCardHead from './ParticipantsCardHead'
import ParticipantsCardBody from './ParticipantsCardBody'

const cn = require('bem-cn')('notify-note-card')

export default class ParticipantsCard extends Component {
  render() {
    return (
      <div className={cn}>
        <ParticipantsCardHead {...this.props} />
        <ParticipantsCardBody {...this.props} />
      </div>
    )
  }
}
