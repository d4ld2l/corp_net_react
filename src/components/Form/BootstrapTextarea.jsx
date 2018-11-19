import React from 'react'

if (process.env.BROWSER) {
  require('./BootstrapTextarea.css')
}

const BootstrapTextarea = ({ input, label, placeholder, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label
      className={`form-group__label ${touched && error ? 'form-group__label_error' : ''}`}
      htmlFor={input.name}
    >
      {label}
    </label>

    <textarea
      {...input}
      placeholder={placeholder}
      rows="3"
      cols="30"
      className={`form-control${touched && error ? ' form-control_error' : ''}`}
      id={input.name}
    />

    {touched &&
      ((error && <span className="form-group__error">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)

export default BootstrapTextarea
