import React from 'react'
import MaskedInput from 'react-text-mask'

if (process.env.BROWSER) {
  require('./BootstrapInput.css')
}

const BootstrapTelephoneInput = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
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
      <MaskedInput
        mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        className={`form-control${touched && error ? ' form-control_error' : ''}`}
        id={input.name}
        placeholder='+7 (512) 512-2414'
        type={type}
        {...input}  
      />
      {touched &&
        ((error && <span className="form-group__error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default BootstrapTelephoneInput
