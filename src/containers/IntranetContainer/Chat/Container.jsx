import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import Iframe from '../../../helpers/Iframe'

export default class Container extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  handlerLoadChant = () => {
    const { token } = this.props

    window.addEventListener('message', e => {
      if (e.data.eventName == 'notification') {
        toastr.success(e.data.data.notification.title, e.data.data.notification.text)
      }
    })

    document.querySelector('.rocket-chat-iframe').contentWindow.postMessage(
      {
        externalCommand: 'login-with-token',
        token,
      },
      '*'
    )
  }

  render() {
    const { url, display } = this.props

    return (
      <Iframe
        className="rocket-chat-iframe container"
        src={url}
        onLoad={this.handlerLoadChant}
        style={{
          height: '100%',
          position: 'relative',
          display: display || 'block',
          paddingLeft: '114px',
        }}
      />
    )
  }
}
