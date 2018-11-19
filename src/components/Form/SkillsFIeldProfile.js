import React, { Component } from 'react'
import Plus from '../Icon/Plus'
import isEqual from 'lodash/isEqual'

const cn = require('bem-cn')('skills-field')

if (process.env.BROWSER) {
  require('./skills-field.scss')
}

export default class SkillsFIeldProfile extends Component {
  state = {
    value: '',
    values: [],
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.input.value, this.state.values) && (typeof nextProps.input.value !== 'string')) {
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
    if ((this.state.values && this.state.values.map(item => (item.skill_attributes.name)).indexOf(this.state.value.trim()) < 0) && (this.state.value.trim() !== '')) {
      this.setState({values: this.state.values.concat({skill_attributes: {name: this.state.value.trim()}})}, this.setValues)
    } else {
      this.setValues()
    }
  }

  setValues = () => {
    const { input: { onChange } } = this.props
    onChange(this.state.values)
    this.setState({ value: '' })
  }

  removeValue = value => {
    if (value.id){
      this.setState({ values: this.state.values && this.state.values.map(item => {
        if (item === value){
          item._destroy = true;
          return (item)
        } else{
          return (item)
        }
      })}, this.setValues)
    } else{
      this.setState({ values: this.state.values && this.state.values.filter(item => item !== value) }, this.setValues)
    }
  }
  render() {
    const {label, touched, error, key, doNotRemoveOld} = this.props
    return (
      <div className={cn()} key={key}>
        {
          label &&
          <label className={`form-group__label${touched && error ? ' form-group__label_error' : ''}`}>
            {label}
          </label>
        }

        <span className={cn('skills-block').mix(`${this.state.values.length ? '' : 'hide'}`)}>
          {this.state.values && this.state.values.map(item => {
            if (!item._destroy){
              return (
                <span className={cn('value')} key={Math.random()}>
                {item.skill_attributes.name}
                  {
                    ((!doNotRemoveOld || !item.id) || ( item.id && !doNotRemoveOld )) &&
                    (
                      <span
                      onClick={() => this.removeValue(item)}
                      className={cn('value-remove').mix('cur')}
                      >
                      <Plus className={cn('remove-skill-icon')} />
                      </span>
                    )
                  }
              </span>
              )
            } else {
              return ('')
            }
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
