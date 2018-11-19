import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { RewindDouble } from 'components-folder/Icon'

const cn = require('bem-cn')('setting')

if (process.env.BROWSER) {
  require('./SettingBlock.css')
}

class StageTransitionBlock extends Component {
  state = {
    openSetting: false,
  }

  handleClickOutside = () => {
    this.handlerCloseSetting()
  }

  handlerOpenSetting = () => {
    this.setState({ openSetting: true })
  }

  handlerCloseSetting = () => {
    this.setState({ openSetting: false })
  }

  render() {
    const { openSetting } = this.state
    const { stages, onChange, iconType, iconClassName } = this.props

    return (
      <div>
        <div
          onClick={() => {
            openSetting ? this.handlerCloseSetting() : this.handlerOpenSetting()
          }}
          title={openSetting ? 'Закрыть' : 'Выбрать этап перевода'}
        >
          <RewindDouble type={iconType || 'filled'} className={iconClassName || cn('stage-icon')} />
        </div>

        {openSetting && (
          <div className={cn('menu')}>
            <ul className={cn('menu-list')}>
              {stages.map(stage =>
                <li className={cn('menu-list-item')} onClick={() => { onChange(stage.id, this.handlerCloseSetting) }} key={stage.id}>
                  <span className={cn('menu-list-item-link')}>
                    {stage.name}
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default onClickOutside(StageTransitionBlock)
