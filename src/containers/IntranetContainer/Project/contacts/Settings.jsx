import React, { Component } from "react"
import onClickOutside from "react-onclickoutside"
import Setting from 'components-folder/Icon/Settings'

const cn = require('bem-cn')('customers')


class Settings extends Component {
  state = {
    open: false,
  }

  handleClickOutside(evt) {
    this.setState({open: false})
  }

  render() {
    const {
      contact,
      onClick,
      show
    } = this.props

    const { open } = this.state

    return (
      <div
        className={cn('customer-item-setting').mix(
          cn(show && 'customer-item-setting_hide')
        )}
      >
        <span
          className={`${cn('customer-item-settings')}`}
          onClick={() => this.setState({ open: !open })}
        >
          <Setting outline
            className={cn('customer-item-setting-icon').state({ open: open })}
          />
        </span>
        {open && (
          <div className={cn('customer-item-settings-menu')}>
            <ul className={cn('customer-item-settings-menu-list')}>
              <li
                className={cn('customer-item-settings-menu-list-item')}
                onClick={() => onClick({ show: 'edit', current: contact })}
              >
                <a className={cn('customer-item-settings-menu-list-item-link')}>
                  Редактировать
                </a>
              </li>
              {/*<li className={cn('customer-item-settings-menu-list-item')}>*/}
              {/*<a className={cn('customer-item-settings-menu-list-item-link')}>Удалить</a>*/}
              {/*</li>*/}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default onClickOutside(Settings)
