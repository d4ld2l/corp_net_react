import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { toggleLinkedCandidateModal } from '../../../redux/actions/candidatesActions'

const cn = require('bem-cn')('candidates-sidebar')

if (process.env.BROWSER) {
  require('./CandidateSidebar.css')
}

class ListContextMenu extends Component {
  handleClickOutside = (e) => {
    this.props.handlerClose(e)
  }

  render() {
    const { dispatch, className, linkedCandidates, handlerClose } = this.props

    return (
      <ul className={cn('context-menu').mix(className)}>
        <li>
          {linkedCandidates.length > 0 
            ? (
              <span
                className={('p2 p2_theme_light_first link_theme_light_first link_pseudo')}
                onClick={() => dispatch(toggleLinkedCandidateModal('noFilter'))}
              >
                Привязать к вакансии
              </span>
            ) 
            : (
              <span
                className={('p2 p2_theme_light_first link_theme_light_first link_pseudo')}
                onClick={handlerClose}
              >
                Вы не выбрали ни одного кадидата
              </span>
            )
          }
        </li>
      </ul>
    )
  }
}

export default onClickOutside(ListContextMenu)
