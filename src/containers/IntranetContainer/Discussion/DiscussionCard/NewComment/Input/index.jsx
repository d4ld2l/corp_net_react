import React from 'react'

if (process.env.BROWSER) {
  require('./style.css')
}

const Input = ({ input, type, disabled, placeholder }) => (
  <input
    {...input}
    autoComplete="off"
    placeholder={placeholder}
    type={type}
    disabled={disabled}
    className={`form-control`}
    id={input.name}
  />
)

export default Input
