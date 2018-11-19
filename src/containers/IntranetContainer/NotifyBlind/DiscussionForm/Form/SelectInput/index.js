import React from 'react'
import Select, { Creatable } from 'react-select'
import { Loupe } from 'components-folder/Icon'

export const cn = require('bem-cn')('discussion-form')
if (process.env.BROWSER) {
  require('react-select/dist/react-select.css')
  require('./style.css')
}

export default ({
  input,
  label,
  isLoading = false,
  className,
  meta: { touched, error, warning },
  ...props
}) => {
  return (
    <div className={cn('search').mix('form-group')}>
      {label && (
        <label className={`form-group__label${touched && error ? ' form-group__label_error' : ''}`}>
          {label}
        </label>
      )}
      <div className={cn('search-wrapper-input')}>
        <Select
          placeholder=""
          searchable
          clearable
          isLoading={isLoading}
          className={className}
          value={input.value}
          onChange={input.onChange}
          options={props.options}
          {...props}
        />
        <Loupe className={cn('search-icon')} />
      </div>
      {touched &&
        ((error && <span className="form-group__error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}
