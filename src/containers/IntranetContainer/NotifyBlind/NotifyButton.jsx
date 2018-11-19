import React, { Component } from 'react'

import Note from 'components-folder/Icon/Note'

const cn = require('bem-cn')('notify-button')

export default class NotifyButton extends Component {
  render() {
    const { onClick } = this.props
    const counter = 0
    return (
      <div className={cn.mix(counter > 0 && 'notify-button_active')} onClick={onClick}>
        {counter > 0 && (
          <div
            className={cn('counter')
              .mix('counter')
              .mix(counter > 99 && 'counter_big')}
          >
            <span className={'counter__text'}>{counter}</span>
          </div>
        )}
        <Note className={cn('note')} />
      </div>
    )
  }
}
