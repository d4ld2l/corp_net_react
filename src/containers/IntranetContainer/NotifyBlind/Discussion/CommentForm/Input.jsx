import React from 'react'

const Input = ({ input, type, disabled, placeholder }) => (
  <div className="input__wrap">
    <input
      {...input}
      autoComplete="off"
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      className="input notify-comment-form__input"
      id={input.name}
    />
  </div>
)

export default Input
