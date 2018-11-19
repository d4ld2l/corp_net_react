import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'ramda'
import onClickOutside from 'react-onclickoutside'
import { toggleLinkedCandidateModal } from '../../../redux/actions/candidatesActions'

const cn = require('bem-cn')('candidates-sidebar')

if (process.env.BROWSER) {
  require('./CandidateSidebar.css')
}
const connector = compose(connect(state => ({ state })), onClickOutside)

class CandidateContextMenu extends Component {
  handleClickOutside = () => {
    this.props.handlerClose()
  }
  render() {
    const { candidate, dispatch } = this.props
    return (
      <ul className={cn('context-menu')}>
        <li>
          <Link to={`/recruitment/candidates/${candidate.id}/edit`}>Редактировать</Link>
        </li>
        <li>
          <span onClick={() => dispatch(toggleLinkedCandidateModal(true))}>
            Привязать к вакансии
          </span>
        </li>
      </ul>
    )
  }
}

export default connector(CandidateContextMenu)
