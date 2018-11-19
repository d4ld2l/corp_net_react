import React, { Component } from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

import { Plus } from '../Icon'

const cn = require('bem-cn')('text-input-group')
if (process.env.BROWSER) {
  require('./TextInputGroup.css')
}

export default class TextInputGroup extends Component {
  field = ({ input, meta, options, label }) => {
    const { name, onChange } = input
    const { touched, error } = meta
    const inputValue = input.value

    const renderInput = inputValue.map((element, index) => {
      const handleChange = event => {
        const arr = [...inputValue]
        arr[index] = event.target.value
        return onChange(arr)
      }

      return (
        <input
          type="text"
          key={index}
          className="form-control"
          value={element}
          onChange={handleChange}
        />
      )
    })

    const handlerClick = () => {
      const arr = [...inputValue]
      arr.push('')
      return onChange(arr)
    }

    return (
      <div className={cn.mix('form-group')}>
        <label className={cn('label')}>{label}</label>

        <div className={cn('input-wrap')}>{renderInput}</div>

        <button className={cn('add-button').mix('no-outline')} onClick={handlerClick}>
          <Plus outline={'filled'} className={cn('plus-icon')} />
        </button>

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}
