import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-router-dom'

import { Note } from '../../Icon'

const cn = require('bem-cn')('user-notes')

if (process.env.BROWSER) {
  require('./UserNotes.css')
}

class UserNotes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openUserNotes: false,
    }
  }

  handleClickOutside = () => {
    this.handkerCloseUserNotes()
  }

  handkerOpenUserNotes = () => {
    this.setState({ openUserNotes: true })
  }

  handkerCloseUserNotes = () => {
    this.setState({ openUserNotes: false })
  }

  render() {
    const { openUserNotes } = this.state

    return (
      <div className={cn}>
        <div
          className={cn('icons')
            .mix('cur')
            .state({ open: openUserNotes })}
          onClick={() => {
            if (openUserNotes) {
              this.handkerCloseUserNotes()
            } else {
              this.handkerOpenUserNotes()
            }
          }}
        >
          <button className={cn('wrapper-notes-icon').mix('btn btn-primary')}>
            <Note className={cn('notes-icon')} title="Заметки" />
          </button>
        </div>

        {openUserNotes && (
          <div className={cn('menu')}>
            <p>Блок для заметок</p>
          </div>
        )}
      </div>
    )
  }
}

export default onClickOutside(UserNotes)
