import React, { Component } from 'react'
import Select from 'react-select'

const cn = require('bem-cn')('select-milestone-group')
if (process.env.BROWSER) {
  require('./SelectMilestoneGroup.css')
}

class CustomValue extends Component {
  render() {
    return (
      <div className={cn('value-wrap').mix('Select-value')}>
        <span style={{ background: this.props.value.color }} className={cn('value-color')} />
        <div className={cn('value-text')}>{this.props.children}</div>
      </div>
    )
  }
}

class CustomOption extends Component {
  handleMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  handleMouseEnter = event => {
    this.props.onFocus(this.props.option, event)
  }

  handleMouseMove = event => {
    if (this.props.isFocused) return
    this.props.onFocus(this.props.option, event)
  }

  render() {
    return (
      <div
        className={cn('option-wrap')}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
      >
        <span style={{ background: this.props.option.color }} className={cn('option-color')} />
        <div className={cn('option-text')}>{this.props.children}</div>
      </div>
    )
  }
}

export default class SelectMilestoneGroup extends Component {
  render() {
    const { value, options, onChange } = this.props

    return (
      <div className={cn.mix('form-group')}>
        <Select
          value={value}
          options={options}
          searchable={false}
          onChange={item => {
            onChange(item)
          }}
          valueComponent={CustomValue}
          optionComponent={CustomOption}
          onInputKeyDown={event => {
            if(event.key === 'Backspace' || event.key === 'Delete'){
              event.preventDefault()
            }
          }}
        />
      </div>
    )
  }
}
