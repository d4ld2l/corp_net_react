import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DateTime from 'react-datetime'

const DateTimeField = ({
  tooltip,
  tooltipPlacement,
  disabled,
  input,
  label,
  placeholder,
  showInput,
  meta: { valid, touched, error, warning },
  ...props
}) => {
  // const classes = classNames('form-group', {
  //   'has-error': (touched && !valid),
  //   'has-success': (touched && valid)
  // })
  return (
    <div className="form-group">
      {label && (
        <label
          htmlFor={input.name}
          className={`form-group__label${touched && error ? ' form-group__label_error' : ''}`}
        >
          {label}
        </label>
      )}

      <DateTime
        name={input.name}
        value={input.value}
        locale="ru"
        dateFormat="MM/DD/YYYY"
        timeFormat="hh:mm"
        closeOnSelect
        inputProps={{ className: `form-control${touched && error ? ' form-control_error' : ''}` }}
        onChange={input.onChange}
        onBlur={input.onBlur}
        disabled={disabled}
        input={showInput}
        {...props}
      />

      {touched &&
        ((error && <span className="form-group__error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}

DateTimeField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string,
}

export default DateTimeField
