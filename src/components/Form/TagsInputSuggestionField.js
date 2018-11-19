import React, { Component } from 'react'
import { Field } from 'redux-form'

const cn = require('bem-cn')('tags-input-suggestion')

if (process.env.BROWSER) {
  require('./tags-input-suggestion.scss')
}

export default class TagsInputSuggestionField extends Component {
  state = {
    value: '',
    values: [],
  }

  handleChange = ({ target: { value } }) => {
    const { tags, search, input: { onChange } } = this.props
    // this.props.addSkill(tags)
    this.setState({ value })
    // search(value)
  }

  handleKey = ({ key }) => {
    if (key === 'Enter') {
      this.setState({ values: this.state.values.concat(this.state.value) }, this.setValues)
    }
  }

  setValues = () => {
    const { tags, search, input: { onChange } } = this.props
    onChange(this.state.values)
    this.setState({ value: '' })
  }

  removeValue = value => {
    this.setState({ values: this.state.values.filter(item => item !== value) })
  }
  render() {
    return (
      <div className={cn()}>
        <span>
          {this.state.values.map(item => {
            return (
              <span className={cn('value')} key={Math.random()}>
                {item}
                <span
                  onClick={() => this.removeValue(item)}
                  className={cn('value-remove').mix('cur')}
                >
                  x
                </span>
              </span>
            )
          })}
          <input
            type="text"
            className={cn('input')}
            onChange={this.handleChange}
            value={this.state.value}
            onKeyPress={this.handleKey}
          />
        </span>
      </div>
    )
  }
}
