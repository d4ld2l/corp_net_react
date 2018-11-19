import React, { Component } from 'react'
import { Settings, Copy, Close } from 'components-folder/Icon/'
import onClickOutside from 'react-onclickoutside'


const cn = require('bem-cn')('distribution')
if (process.env.BROWSER) {
  require('./style.css')
}

class SettingsMenu extends Component {
  state = {
    open: false,
  }

  handleClickOutside = () => {
    this.setState({open: false})
  }

  render(){
    const { open } = this.state
    return (
      <span>
        <span
          className={`${cn('group-item-settings')}`}
          onClick={() => this.setState({ open: !open })}
          title={open ? 'Закрыть' : 'Открыть'}
        >
              <Settings outline className={cn('group-item-setting-icon').state({ open: open })} />
            </span>
        {open && (
          <div className={cn('group-item-settings-menu')}>
            <ul className={cn('group-item-settings-menu-list')}>
              <li
                className={cn('group-item-settings-menu-list-item')}
              >
                <a className={cn('group-item-settings-menu-list-item-link')}  onClick={() => this.props.handlerEditGroup(this.props.group)}>Редактировать</a>
              </li>
              <li
                className={cn('group-item-settings-menu-list-item')}
              >
                <a className={cn('group-item-settings-menu-list-item-link')} onClick={()=> this.props.deleteGroup(this.props.group)}>Удалить</a>
              </li>
            </ul>
          </div>
        )}
      </span>
    )
  }

}

export default onClickOutside(SettingsMenu)
