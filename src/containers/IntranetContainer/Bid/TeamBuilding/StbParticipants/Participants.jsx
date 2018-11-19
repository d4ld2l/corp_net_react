import React, { Component } from 'react'

import ParticipantItem from './ParticipantItem'
import * as ReactDOM from 'react-dom'

const cn = require('bem-cn')('list-of-participants')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Participants extends Component {
  componentDidMount() {
    this._participantsBlock = ReactDOM.findDOMNode(this._participantsBlock)
    const _participantsBlock = this._participantsBlock

    if (_participantsBlock.clientHeight > 580) {
      _participantsBlock.classList.add('global-scroll')
      _participantsBlock.classList.add('global-scroll_theme_light')
    } else {
      _participantsBlock.classList.remove('global-scroll')
      _participantsBlock.classList.remove('global-scroll_theme_light')
    }
  }

  render() {
    const { stb_participants } = this.props
    return (
      <div className={cn('wrap')} ref={node => this._participantsBlock = node}>
        {stb_participants.data.map((it, i) => (
          <ParticipantItem
            participant={it}
            key={i + it.account.full_name}
          />
        ))}
      </div>

    )
  }
}
