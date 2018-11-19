import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import onClickOutside from 'react-onclickoutside'
import { ChangeStageCandidateModal } from 'components-folder/Modals/ChangeStageCandidateModal'
import { toggleLinkedCandidateModal } from 'redux-folder/actions/candidatesActions'

const cn = require('bem-cn')('vacancy-candidates-sidebar')

if (process.env.BROWSER) {
  require('./style/VacancyCandidatesSidebar.css')
}
const connector = compose(connect(state => ({ state })), onClickOutside)

class ListContextMenu extends Component {
  handleClickOutside = () => {
    this.props.handlerClose()
  }
  render() {
    const { dispatch, className } = this.props
    return (
      <ul className={cn('context-setting-menu').mix(className)}>
        <li>
           <span onClick={() => dispatch(toggleLinkedCandidateModal(true))}>
            Выбрать этап
          </span>
        </li>
      </ul>
    )
  }
}



export default connector(ListContextMenu)
