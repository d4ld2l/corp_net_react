import React, { Component } from 'react'

const cn = require('bem-cn')('radio-button')

if (process.env.BROWSER) {
  require('./RadioButton.css')
}

type Props = {
  label: string,
  id: string,
  input: {
    checked: boolean,
    name: string,
    value: string,
  },
}

class RadioButton extends Component<Props> {
  render() {
    const { disabled, error, label, input, id } = this.props

    return (
      <div className={cn}>
        <input type="radio" {...input} className={cn('input')} checked={input.checked} id={id} />
        <label
          tabIndex={!disabled ? 0 : null}
          className={cn('label', { disabled, error })}
          htmlFor={id}
        >
          {label}
          {error && <span className={cn('text_error')}>{error}</span>}
        </label>
      </div>
    )
  }
}
export default RadioButton
