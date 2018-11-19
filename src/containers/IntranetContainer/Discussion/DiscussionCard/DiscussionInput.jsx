import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { cn } from './index'

class DiscussionInput extends Component {
  handleClickOutside = () => {
    this.props.handlerClose()
  }
  render() {
    return (
      <div className={cn('func-elements-input-wrapper')}>
        <label htmlFor="text" className={cn('func-elements-label')}>
          Добавить участника
        </label>
        <input type="text" className={cn('func-elements-input')} />
      </div>
    )
  }
}

export default onClickOutside(DiscussionInput)
