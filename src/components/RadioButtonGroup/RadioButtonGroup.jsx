import React, { Component } from 'react'

const cn = require('bem-cn')('radio-button-group')

if (process.env.BROWSER) {
  require('./style.css')
}

export default class RadioButtonGroup extends Component {
  render() {
    const { options, layout, name, input, meta } = this.props
    const hasError = meta.touched && meta.error
    return (
      <div className={cn.mix('btn-group').mix('theme_light').state({ block: layout === 'block' })}>
        {options.map(e => (
          <label
            key={e.value}
            tabIndex={'0'}
            className={`btn btn-default sex ${e.value === input.value ? 'sex_active' : ''}`}
            {...(e.disabled ? { disabled: 'disabled' } : {})}
          >
            <input
              type="radio"
              name={name}
              checked={e.value === input.value}
              {...input}
              value={e.value}
            />
            {e.label}
          </label>
        ))}
        {hasError && <span className="error">{meta.error}</span>}
      </div>
    )
  }
}
