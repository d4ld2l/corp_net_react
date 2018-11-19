import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'

const cn = require('bem-cn')('vacancy-candidates-sidebar')

if (process.env.BROWSER) {
  require('./style/VacancyCandidatesSidebar.css')
}

class CandidateContextMenu extends Component {
  handleClickOutside = (e) => {
    this.props.handlerClose(e)
  }

  render() {
    const { candidate } = this.props
    return (
      <ul className={cn('context-menu')}>
        <li>
          <Link to={`../candidates/${candidate.id}/edit`}>Редактировать</Link>
        </li>
      </ul>
    )
  }
}

export default onClickOutside(CandidateContextMenu)
