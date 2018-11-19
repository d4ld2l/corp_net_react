import React, { Component } from 'react'

import onClickOutside from 'react-onclickoutside'

class ClickOutside extends Component {
  handleClickOutside = event => this.props.onClick(event)

  render() {
    return this.props.children
  }
}

export default onClickOutside(ClickOutside)
