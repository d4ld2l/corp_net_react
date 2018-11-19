import React, { Component } from 'react'

const cn = require('bem-cn')('textarea')
if (process.env.BROWSER) {
  require('./textarea.css')
}

export default class Textarea extends Component {
  render() {
    const {
      showLabel,
      labelText,
      className,
      style,
      type,
      name,
      id,
      placeholder,
      disabled,
      pattern,
      required,
      value,
      alt,
      showWink,
      winkText,
      showError,
      errorText,
      input,
    } = this.props
    return (
      <div>
        {showLabel && (
          <label className={cn('label')} htmlFor={id}>
            {labelText}
          </label>
        )}
        <textarea
          className={cn.mix(className).mix(showError && cn('error_border'))}
          style={style}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          pattern={pattern}
          required={required}
          value={value}
          alt={alt}
          {...input}
        />
        {showError &&  <p className={cn('error')}>{errorText}</p>}
        {showWink && <p className={cn('wink')}>{winkText}</p>}
      </div>
    )
  }
}
