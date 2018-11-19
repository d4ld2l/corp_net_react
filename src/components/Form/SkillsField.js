import React, { Component } from 'react'
import Plus from '../Icon/Plus'
import isEqual from 'lodash/isEqual'

const cn = require('bem-cn')('skills-field')

if (process.env.BROWSER) {
  require('./skills-field.scss')
}

export default class SkillsField extends Component {
  state = {
    value: '',
    values: [],
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.input.value, this.state.values)) {
      this.setState({ values: nextProps.input.value })
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  }

  handleKey = ({ key }) => {
    if (key === 'Enter') {
      this.addValue()
    }
  }

  addValue = () => {
    this.setState({ values: this.state.values.concat(this.state.value) }, this.setValues)
  }

  setValues = () => {
    const { input: { onChange } } = this.props
    onChange(this.state.values)
    this.setState({ value: '' })
  }

  removeValue = value => {
    this.setState({ values: this.state.values.filter(item => item !== value) }, this.setValues)
  }
  render() {
    return (
      <div className={cn()}>
        <span className={cn('skills-block').mix(`${this.state.values.length ? '' : 'hide'}`)}>
          {this.state.values.map(item => {
            return (
              <span className={cn('value')} key={Math.random()}>
                {item}
                <span
                  onClick={() => this.removeValue(item)}
                  className={cn('value-remove').mix('cur')}
                >
                  <Plus className={cn('remove-skill-icon')} />
                </span>
              </span>
            )
          })}
        </span>
        <input
          type="text"
          className={cn('input')}
          onChange={this.handleChange}
          value={this.state.value}
          onKeyPress={this.handleKey}
        />
        <span className={cn('add-skill').mix('cur')} onClick={this.addValue}>
          <Plus className={cn('add-skill-icon').mix('is-plus')} />
        </span>
      </div>
    )
  }
}
