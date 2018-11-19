import React from 'react'

if (process.env.BROWSER) {
  require('./BootstrapInput.css')
}

const BootstrapInput = ({ input, label, meta: { touched, error, warning }, ...props }) => {
  // const { input, label, type, maxLength, placeholder, autoComplete, autoFocus,
  //   meta: { touched, error, warning } } = props

  return (
    <div className="form-group">
      {label && (
        <label
          className={`form-group__label ${touched && error ? 'form-group__label_error' : ''}`}
          htmlFor={input.name}
        >
          {label}
        </label>
      )}

      <div>
        <input
          {...input}
          className={`form-control${touched && error ? ' form-control_error' : ''}`}
          id={input.name}
          {...props}
        />

        {touched &&
          ((error && <span className="form-group__error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

export default BootstrapInput
