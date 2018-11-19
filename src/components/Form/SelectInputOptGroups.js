import React from 'react'
import Select from 'react-select-plus'

if (process.env.BROWSER) {
  require('react-select-plus/dist/react-select-plus.css')
  require('./SelectInput.css')
}

export default ({
  input,
  label,
  type,
  searchable = false,
  clearable = false,
  multi = false,
  meta: { touched, error, warning },
  noResultsText = 'No results found',
  ...props
}) => (
  <div className="form-group">
    <label className={`form-group__label${touched && error ? ' form-group__label_error' : ''}`}>
      {label}
    </label>
    <Select
      placeholder={'Выбрать'}
      searchable={searchable}
      clearable={clearable}
      backspaceRemoves={false}
      multi={multi}
      className={touched && error ? 'Select--error' : ''}
      {...props}
      value={input.value}
      noResultsText={noResultsText}
      onChange={value => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)}
      options={props.options}
    />
    {touched &&
      ((error && <span className="form-group__error">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)
