import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DateTime from 'react-datetime'
import {Calendar} from '../Icon'

if (process.env.BROWSER) {
  require('./DateTimeFieldVariant.css')
}

const cn = require('bem-cn')('data-time-field-variant')

const DateTimeFieldVariant = ({
                                tooltip,
                                tooltipPlacement,
                                disabled,
                                input,
                                label,
                                placeholder,
                                meta: {valid, touched, error, warning},
                                ...props
                              }) => {
  return (
    <div className={cn}>
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
          inputProps={{className: `form-control${touched && error ? ' form-control_error' : ''}`}}
          onChange={input.onChange}
          onBlur={input.onBlur}
          disabled={disabled}
          {...props}
        />
        <Calendar className={cn('calendar-icon')}/>

        {touched &&
        ((error && <span className="form-group__error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

DateTimeFieldVariant.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string,
}

export default DateTimeFieldVariant
