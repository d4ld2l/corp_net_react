import React from 'react'

const cn = require('bem-cn')('input')
if (process.env.BROWSER) {
  require('./input.css')
}

const Input = ({
  input,
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
  toIndent,
  touched,
  error,
  warning,
  ...props,
}) => {
  return (
    <div className={cn('wrap').mix(toIndent && cn('to-indent'))}>
      {showLabel && (
        <label
          className={cn('label').mix(touched && ((error || warning) && cn('label_error')))}
          htmlFor={id}
        >
          {labelText} {required && <span className={cn('required')}>*</span>}
        </label>
      )}
      <input
        {...props}
        className={cn.mix(className).mix(touched && ((error || warning) && cn('error_border')))}
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
      {showError && <p className={cn('error')}>{errorText}</p>}
      {touched &&
        ((error && <p className={cn('error')}>{error}</p>) ||
          (warning && <p className={cn('error')}>{warning}</p>))}
      {showWink && <p className={cn('wink')}>{winkText}</p>}
    </div>
  )
}

export default Input
