import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-router-dom'
import { Settings } from 'components-folder/Icon'
import { toggleLinkedCandidateModal } from '../../../redux/actions/candidatesActions'
import { connect } from 'react-redux'
import { compose } from 'ramda'

const cn = require('bem-cn')('setting')

const connector = compose(connect(state => ({ state })), onClickOutside)

if (process.env.BROWSER) {
  require('./SettingBlock.css')
}

class SettingBlock extends Component {
  state = {
    openSetting: false,
  }
  handleClickOutside = () => {
    this.handkerCloseSetting()
  }

  render() {
    const { openSetting } = this.state
    const { dispatch } = this.props

    return (
      <div>
        <div
          className={cn.mix('cur').state({ open: openSetting })}
          onClick={() => {
            openSetting ? this.handkerCloseSetting() : this.handkerOpenSetting()
          }}
          title={openSetting ? 'Закрыть' : 'Открыть'}
        >
          <Settings outline className={cn('round-icon')} />
        </div>

        {openSetting && (
          <div className={cn('menu')}>
            <ul className={cn('menu-list')}>
              <li className={cn('menu-list-item')}>
                <Link className={cn('menu-list-item-link')} to={`/recruitment/candidates/${this.props.candidateId}/edit`}>
                  Редактировать
                </Link>
              </li>
              <li className={cn('menu-list-item')}>
                <span
                  className={cn('menu-list-item-link')}
                  onClick={() => dispatch(toggleLinkedCandidateModal(true))}
                >
                  Привязать к вакансии
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }

  handkerOpenSetting = () => {
    this.setState({ openSetting: true })
  }

  handkerCloseSetting = () => {
    this.setState({ openSetting: false })
  }
}
export default connector(SettingBlock)
